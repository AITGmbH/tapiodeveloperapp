import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject, Subscription } from "rxjs";
import { SourceKeys } from "./source-keys.model";
import { AssignedMachine } from "../shared/models/assigned-machine.model";
import { HistoricalDataService } from "./scenario-historicaldata.service";
import { catchError, tap } from "rxjs/operators";

@Component({
    selector: "app-scenario-historicaldata",
    templateUrl: "./scenario-historicaldata.component.html",
    styleUrls: ["./scenario-historicaldata.component.css"]
})
export class ScenarioHistoricaldataComponent implements OnInit {
    assignedMachines$: Observable<AssignedMachine[]>;
    sourceKeys: SourceKeys;
    error$ = new Subject<boolean>();
    loadingMachines$ = new Subject<boolean>();
    sourceKeys$: Observable<SourceKeys>;

    constructor(private historicalDataService: HistoricalDataService) {
        this.error$.next(false);
        this.loadingMachines$.next(false);
    }

    ngOnInit() {
        this.loadingMachines$.next(true);
        this.assignedMachines$ = this.historicalDataService.getMachines().pipe(
            tap(() => {
                this.loadingMachines$.next(false);
            }),
            catchError(error => {
                console.error("could not load machines", error);
                this.error$.next(true);
                return of([]);
            })
        );
    }
    public selectedMachineChanged(machine: AssignedMachine) {
        if (machine && machine.tmid) {
            this.error$.next(false);
            this.sourceKeys = null;
            console.log(machine.tmid);
            this.sourceKeys$ = this.historicalDataService.getSourceKeys(machine.tmid).pipe(
                catchError(error => {
                    console.error("could not load sourceKeys", error);
                    this.error$.next(true);
                    return of(null);
                })
            );
        }
    }
}
