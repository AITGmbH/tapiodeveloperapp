import { Component, OnInit, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject, Observable } from "rxjs";
import { take } from "rxjs/internal/operators/take";
import { filter, map } from "rxjs/operators";
import { MachineLiveDataService } from "./scenario-machinelivedata.service";
import { MachineLiveDataContainer } from "./scenario-machinelivedata.models";

@Component({
    selector: "app-scenario-machinelivedata",
    templateUrl: "./scenario-machinelivedata.component.html",
    styleUrls: ["./scenario-machinelivedata.component.css"]
})
export class ScenarioMachineLiveDataComponent implements OnInit, OnDestroy {
    private selectedMachine: string;
    private streamData$: Subject<MachineLiveDataContainer>;
    public itemData$ = new BehaviorSubject<MachineLiveDataContainer[]>([]);
    public conditionData$ = new BehaviorSubject<MachineLiveDataContainer[]>([]);
    public isLocalMode = true;
    constructor(private readonly machineLiveDataService: MachineLiveDataService) {}

    public async ngOnInit() {
        await this.machineLiveDataService.startConnectionAsync("/hubs/machinelivedata");

        this.machineLiveDataService
            .getIsLiveDataLocalMode()
            .pipe(
                map(isLocalMode => {
                    if (isLocalMode) {
                        this.selectedMachineChanged("TestMachine");
                    }
                    return isLocalMode;
                })
            )
            .subscribe(isLocalMode => (this.isLocalMode = isLocalMode));
    }

    public ngOnDestroy() {
        this.unsubscribeDataListener();
    }

    public async selectedMachineChanged(machineId: string): Promise<void> {
        if (machineId && machineId !== this.selectedMachine) {
            this.itemData$.next([]);
            this.conditionData$.next([]);
            this.selectedMachine = machineId;
            await this.machineLiveDataService.joinGroupAsync(this.selectedMachine);
            this.startDataListener();
        }
    }

    private startDataListener(): void {
        if (this.streamData$ != null && !this.streamData$.isStopped) {
            this.unsubscribeDataListener();
        }
        this.streamData$ = this.machineLiveDataService.addDataListener();
        this.streamData$
            .pipe(filter(data => this.isCurrentMachine(data) && data.isItemData))
            .subscribe(data => this.addElement(this.itemData$, data));

        this.streamData$
            .pipe(filter(data => this.isCurrentMachine(data) && data.isCondition))
            .subscribe(data => this.addElement(this.conditionData$, data));
    }

    private unsubscribeDataListener(): void {
        if (this.streamData$ != null) {
            this.streamData$.unsubscribe();
            this.streamData$ = null;
        }
    }

    private isCurrentMachine(data: MachineLiveDataContainer): boolean {
        return data.tmid === this.selectedMachine;
    }

    /**
     * This method adds an element to the provided datastructure.
     * In the case it already exsits, it would be replaced.
     * @param subject The datastructure to add the element to.
     * @param element The element which should be added to the datastructure.
     */
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
