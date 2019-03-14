import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { HistoricalDataService } from '../shared/services/historical-data.service';
import { SourceKeys } from '../shared/models/source-keys.model';
import { AssignedMachine } from '../shared/models/assigned-machine.model';

@Component({
    selector: "app-scenario-historicaldata",
    templateUrl: "./scenario-historicaldata.component.html",
    styleUrls: ["./scenario-historicaldata.component.css"]
})
export class ScenarioHistoricaldataComponent implements OnInit {
    assignedMachines: Observable<AssignedMachine[]>;
    sourceKeys: SourceKeys;
    error$ = new Subject<boolean>();
    loading$ = new Subject<boolean>();
    loadingMachines$ = new Subject<boolean>();

    constructor(private historicalDataService: HistoricalDataService) {
        this.error$.next(false);
        this.loading$.next(false);
        this.loadingMachines$.next(false);
    }

    ngOnInit() {
        this.loadingMachines$.next(true);
        this.historicalDataService.getMachines().subscribe(
            machines => {
                this.assignedMachines = of(machines);
                this.loadingMachines$.next(false);
            },
            error => {
                console.error("could not load machines", error);
                this.loadingMachines$.next(false);
                this.error$.next(true);
            }
        );
    }

    public selectedMachineChanged(tmid: string) {
        this.loading$.next(true);
        this.error$.next(false);
        this.sourceKeys = null;
        this.historicalDataService.getSourceKeys(tmid).subscribe(
            sourceKeys => {
                this.sourceKeys = sourceKeys;
                this.loading$.next(false);
            },
            error => {
                console.error("could not load sourceKeys", error);
                this.loading$.next(false);
                this.error$.next(true);
            }
        );
    }
}
