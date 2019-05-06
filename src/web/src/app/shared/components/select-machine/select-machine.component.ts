import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Observable, of, Subscription as rxSubscription } from "rxjs";
import { AssignedMachine } from "../../models/assigned-machine.model";
import { MachineOverviewService } from "src/app/scenario-machineoverview/scenario-machineoverview.service";
import { map, catchError, tap } from "rxjs/operators";
import { Subscription } from "../../models/subscription.model";
import { NgOption } from "@ng-select/ng-select";

@Component({
    selector: "app-select-machine",
    templateUrl: "select-machine.component.html",
    styleUrls: ["./select-machine.component.css"]
})
export class SelectMachineComponent implements OnInit {
    public items$: Observable<Array<AssignedMachine | NgOption>>;
    selectedMachine: AssignedMachine;
    @Input() initialMachineId: string;

    @Output() public change: EventEmitter<string> = new EventEmitter<string>();

    constructor(private machineOverviewService: MachineOverviewService) {}

    ngOnInit() {
        this.items$ = this.machineOverviewService.getSubscriptions().pipe(
            map((subs: Subscription[]) => {
                return subs.reduce((output: (AssignedMachine | NgOption)[], sub) => {
                    return (
                        output
                            // add disabled Element describing the Subscription
                            .concat({ displayName: sub.name, disabled: true })
                            // and add its Machines
                            .concat(
                                ...sub.assignedMachines.map(machine => ({
                                    // prefix displayName of machine to visualize that is is part of a subscription
                                    displayName: "↳ " + machine.displayName,
                                    tmid: machine.tmid
                                }))
                            )
                            .concat(
                            )
                    );
                }, []);
            }),
            tap((items: (AssignedMachine | NgOption)[]) => {
                // filter items by assignedMachines
                const allMachines = items.filter((object) => object.tmid) as AssignedMachine[];
                this.selectedMachine = allMachines.find((machine) =>  machine.tmid === this.initialMachineId)

            }),
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
