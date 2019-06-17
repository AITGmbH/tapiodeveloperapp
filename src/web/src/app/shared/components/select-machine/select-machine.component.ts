import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from "@angular/core";
import { Observable, of, Subscription as rxSubscription } from "rxjs";
import { AssignedMachine } from "../../models/assigned-machine.model";
import { MachineOverviewService } from "src/app/scenario-machineoverview/scenario-machineoverview.service";
import { map, catchError, tap } from "rxjs/operators";
import { Subscription } from "../../models/subscription.model";
import { NgOption } from "@ng-select/ng-select";

@Component({
    selector: "app-select-machine",
    templateUrl: "select-machine.component.html",
    styleUrls: ["./select-machine.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class SelectMachineComponent implements OnInit {
    public items$: Observable<Array<Subscription>>;
    selectedMachine: AssignedMachine;
    @Input() initialMachineId: string;

    @Output() public change: EventEmitter<string> = new EventEmitter<string>();

    constructor(private readonly machineOverviewService: MachineOverviewService) {}

    ngOnInit() {
        this.items$ = this.machineOverviewService.getSubscriptions().pipe(
            catchError(err => {
                console.log("could not load machines", err);
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
