import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { AssignedMachine } from "../../models/assigned-machine.model";
import { AvailableMachinesService } from "../../services/available-machines.service";

@Component({
    selector: "app-select-machine",
    templateUrl: "select-machine.component.html",
    styleUrls: ["./select-machine.component.css"]
})

export class SelectMachineComponent implements OnInit {
    public assignedMachines$: Observable<AssignedMachine[]>;

    @Output() public change: EventEmitter<string> = new EventEmitter<string>();

    constructor(private availableMachinesService: AvailableMachinesService) {}

    ngOnInit() {
        this.availableMachinesService.getMachines().subscribe(
            machines => {

            },
            error => {
                console.error("could not load machines", error);
            }
        );
    }

    public selectedMachineChanged(machine: AssignedMachine)
{

    if (machine && machine.tmid) {
        this.change.emit(machine.tmid);
    }
}
}
