import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ScenarioMachineLiveDataService,
    MachineLiveDataContainer,
    MessageTypes
} from "./scenario-machinelivedata.service";
import { BehaviorSubject, Subscription, Subject } from "rxjs";
import { take } from "rxjs/internal/operators/take";
import { some } from "lodash";

@Component({
    selector: "app-scenario-machinelivedata",
    templateUrl: "./scenario-machinelivedata.component.html",
    styleUrls: ["./scenario-machinelivedata.component.css"]
})
export class ScenarioMachineLiveDataComponent implements OnInit, OnDestroy {
    private selectedMachine: string;
    private streamDataSubject: Subject<MachineLiveDataContainer>;
    public itemData$ = new BehaviorSubject<MachineLiveDataContainer[]>([]);
    public conditionData$ = new BehaviorSubject<MachineLiveDataContainer[]>([]);

    constructor(private readonly liveDataService: ScenarioMachineLiveDataService, private readonly http: HttpClient) {}

    public async ngOnInit() {
        await this.liveDataService.startConnectionAsync("/hubs/machinelivedata");
    }

    public ngOnDestroy() {
        this.unsibscribeDataListener();
    }

    public async selectedMachineChanged(machineId: string) {
        if (machineId != null && machineId !== "" && machineId !== this.selectedMachine) {
            this.itemData$.next([]);
            this.conditionData$.next([]);
            this.selectedMachine = machineId;
            await this.liveDataService.joinGroupAsync(this.selectedMachine);
            this.startDataListener();
            this.startRequest();
        }
    }

    private startDataListener(): void {
        if (this.streamDataSubject != null && !this.streamDataSubject.isStopped) {
            this.unsibscribeDataListener();
        }
        this.streamDataSubject = this.liveDataService.addDataListener();
        this.streamDataSubject.subscribe(data => this.onStreamData(data));
    }

    private unsibscribeDataListener(): void {
        if (this.streamDataSubject != null) {
            this.streamDataSubject.unsubscribe();
            this.streamDataSubject = null;
        }
    }

    private onStreamData(data: MachineLiveDataContainer): void {
        if (data.tmid !== this.selectedMachine) {
            return;
        }
        switch (data.msgt) {
            case MessageTypes.ItemData:
                this.addElement(this.itemData$, data);
                break;
            case MessageTypes.Condition:
                this.addElement(this.conditionData$, data);
                break;
            default:
                break;
        }
    }

    private addElement(subject: BehaviorSubject<any>, element: MachineLiveDataContainer) {
        subject.pipe(take(1)).subscribe((values: MachineLiveDataContainer[]) => {
            console.log(values);
            const newValues = [];
            if (values.some(el => el.msg.k === element.msg.k)) {
                for (let value of values) {
                    if (value.msg.k === element.msg.k) {
                        value = element;
                    }
                    newValues.push(value);
                }
            } else {
                newValues.push(...values, element);
            }
            subject.next(newValues);
        });
    }

    private startRequest(): Subscription {
        return this.http.get(`/api/machinelivedata`).subscribe(() => console.log("Event hub invoked"));
    }
}
