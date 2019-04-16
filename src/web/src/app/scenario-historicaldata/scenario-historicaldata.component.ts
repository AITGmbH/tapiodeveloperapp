import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { SourceKeys } from "./source-keys.model";
import { HistoricalDataService } from "./scenario-historicaldata.service";

@Component({
    selector: "app-scenario-historicaldata",
    templateUrl: "./scenario-historicaldata.component.html",
    styleUrls: ["./scenario-historicaldata.component.css"]
})
export class ScenarioHistoricaldataComponent implements OnInit {
    sourceKeys$: Observable<SourceKeys>;
    error$ = new Subject<boolean>();
    loading$ = new Subject<boolean>();

    constructor(private readonly historicalDataService: HistoricalDataService) {
        this.error$.next(false);
        this.loading$.next(false);
    }

    ngOnInit() {}

    public selectedMachineChanged(tmid: string) {
        this.loading$.next(true);
        this.error$.next(false);
        this.sourceKeys$ = null;
        this.historicalDataService.getSourceKeys(tmid).subscribe(
            sourceKeys => {
                this.sourceKeys$ = of(sourceKeys);
                this.loading$.next(false);
            },
            error => {
                console.error("could not load sourceKeys", error);
                this.loading$.next(false);
                this.error$.next(true);
            }
        );
    }

    public dateRangeChanged(dateRange: {dateStart: Date, dateEnd: Date}){
        console.log('date range changed', dateRange);
      }
}
