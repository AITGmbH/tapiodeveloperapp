import { Component, OnInit, OnDestroy } from "@angular/core";
import { MachineLiveDataService, MachineLiveDataContainer, MessageTypes } from "./scenario-machinelivedata.service";
import { BehaviorSubject, Subject } from "rxjs";
import { take } from "rxjs/internal/operators/take";

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

    constructor(private readonly machineLiveDataService: MachineLiveDataService) {}

    public async ngOnInit() {
        await this.machineLiveDataService.startConnectionAsync("/hubs/machinelivedata");
    }

    public ngOnDestroy() {
        this.unsibscribeDataListener();
    }

    public async selectedMachineChanged(machineId: string): Promise<void> {
        if (machineId != null && machineId !== "" && machineId !== this.selectedMachine) {
            this.itemData$.next([]);
            this.conditionData$.next([]);
            this.selectedMachine = machineId;
            await this.machineLiveDataService.joinGroupAsync(this.selectedMachine);
            this.startDataListener();
            this.machineLiveDataService.startRequest();
        }
    }

    private startDataListener(): void {
        if (this.streamDataSubject != null && !this.streamDataSubject.isStopped) {
            this.unsibscribeDataListener();
        }
        this.streamDataSubject = this.machineLiveDataService.addDataListener();
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
        }
    }

    private addElement(subject: BehaviorSubject<any>, element: MachineLiveDataContainer) {
        subject.pipe(take(1)).subscribe((values: MachineLiveDataContainer[]) => {
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
}
