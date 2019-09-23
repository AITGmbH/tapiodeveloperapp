import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { AssignedMachine } from "../../models/assigned-machine.model";
import { MachineState } from "../../models/assigned-machine.model";
import { MachineOverviewService } from "../../../scenario-machineoverview/scenario-machineoverview.service";
import { catchError, tap } from "rxjs/operators";
import { Subscription } from "../../models/subscription.model";

@Component({
    selector: "app-select-machine",
    templateUrl: "select-machine.component.html",
    styleUrls: ["./select-machine.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class SelectMachineComponent implements OnInit {
    public items$: Observable<Array<Subscription>>;
    public error$ = new BehaviorSubject<boolean>(false);
    public loading$ = new BehaviorSubject<boolean>(false);
    machineStateType = MachineState;
    selectedMachine: AssignedMachine;
    @Input() initialMachineId: string;

    @Output() public change: EventEmitter<string> = new EventEmitter<string>();

    constructor(private readonly machineOverviewService: MachineOverviewService) {
        this.loading$.next(true);
    }

    ngOnInit() {
        this.items$ = this.machineOverviewService.getSubscriptions().pipe(
          tap(subscriptions => {
            for (const subscription of subscriptions) {
              for (const machine of subscription.assignedMachines) {
                if (machine.tmid === this.initialMachineId) {
                  this.selectedMachine = machine;
                }
              }
            }
          }),
            catchError(err => {
                this.error$.next(true);
                this.loading$.next(false);
                return of([]);
            })
        );
    }

    public selectedMachineChanged(machine: AssignedMachine) {
        if (machine && machine.tmid) {
            this.error$.next(false);
            this.loading$.next(false);
            this.change.emit(machine.tmid);
        }
    }
}
