import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ScenarioMachineLiveDataService,
    MachineLiveDataContainer,
    MessageTypes
} from "./scenario-machinelivedata.service";
import { BehaviorSubject, Subscription, Subject } from "rxjs";

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
                this.itemData$.next([data]);
                break;
            case MessageTypes.Condition:
                this.conditionData$.next([data]);
                break;
            default:
                break;
        }
    }

    private startRequest(): Subscription {
        return this.http.get(`/api/machinelivedata`).subscribe(() => console.log("Event hub invoked"));
    }
}
