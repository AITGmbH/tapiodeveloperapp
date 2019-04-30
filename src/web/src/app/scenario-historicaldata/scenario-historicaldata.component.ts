import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { SourceKeys } from "./source-keys.model";
import { HistoricalDataService } from "./scenario-historicaldata.service";
import { catchError } from 'rxjs/operators';

@Component({
    selector: "app-scenario-historicaldata",
    templateUrl: "./scenario-historicaldata.component.html",
    styleUrls: ["./scenario-historicaldata.component.css"]
})
export class ScenarioHistoricaldataComponent implements OnInit {
    sourceKeys$: Observable<SourceKeys>;
    error$ = new Subject<boolean>();

    constructor(private readonly historicalDataService: HistoricalDataService) {
        this.error$.next(false);
    }

    ngOnInit() {}

    public selectedMachineChanged(tmid: string) {
        this.error$.next(false);
        this.sourceKeys$ = this.historicalDataService.getSourceKeys(tmid)
        .pipe(catchError((err) => {
            console.error("could not load sourceKeys", err);
            this.error$.next(true);
            return of(null);
        }));
    }
}
