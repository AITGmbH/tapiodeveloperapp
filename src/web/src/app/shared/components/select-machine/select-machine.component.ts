import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable, of } from "rxjs";
import { AssignedMachine } from "../../models/assigned-machine.model";
import { AvailableMachinesService } from "../../services/available-machines.service";
import { catchError } from "rxjs/operators";

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
        this.assignedMachines$ = this.availableMachinesService.getMachines().pipe(
            catchError(err => {
                console.error("could not load machines", err);
                return of([]);
            })
        );
    }

    public selectedMachineChanged(machine: AssignedMachine) {
        if (machine && machine.tmid) {
            this.change.emit(machine.tmid);
        }
    }
}
