import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { AssignedMachine } from "../../models/assigned-machine.model";
import { HistoricalDataService } from "src/app/scenario-historicaldata/scenario-historicaldata.service";

@Component({
    selector: "app-select-machine",
    templateUrl: "select-machine.component.html",
    styleUrls: ["./select-machine.component.css"]
})
export class SelectMachineComponent implements OnInit, OnDestroy {
    public assignedMachines: Observable<AssignedMachine[]>;
    private machineSubscription: Subscription;
    selectedMachine: AssignedMachine;
    @Input() initialMachineId: string;

    @Output() public change: EventEmitter<string> = new EventEmitter<string>();

    constructor(private historicalDataService: HistoricalDataService) {}

    ngOnInit() {
        this.machineSubscription = this.historicalDataService.getMachines().subscribe(
            machines => {
                this.assignedMachines = of(machines);
                this.selectedMachine = machines.find((machine) => machine.tmid === this.initialMachineId)
            },
            error => {
                console.error("could not load machines", error);
            }
        );
    }

    ngOnDestroy(): void {
        if(this.machineSubscription) {
            this.machineSubscription.unsubscribe();
        }
    }

    public selectedMachineChanged(machine: AssignedMachine) {
        if(machine && machine.tmid) {
            this.change.emit(machine.tmid);
        }
    }
}
