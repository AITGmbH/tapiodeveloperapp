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
    selectedMachine: string;

    results = [
        {
            name: "TestData1",
            series: [
                {
                    value: 4155,
                    name: "2016-09-16T07:09:36.450Z"
                },
                {
                    value: 4666,
                    name: "2016-09-21T05:57:53.706Z"
                },
                {
                    value: 5723,
                    name: "2016-09-18T14:16:09.828Z"
                },
                {
                    value: 2902,
                    name: "2016-09-22T15:32:13.005Z"
                },
                {
                    value: 2674,
                    name: "2016-09-22T03:29:51.553Z"
                }
            ]
        },
        {
            name: "TestData2",
            series: [
                {
                    value: 4499,
                    name: "2016-09-16T07:09:36.450Z"
                },
                {
                    value: 6160,
                    name: "2016-09-21T05:57:53.706Z"
                },
                {
                    value: 4280,
                    name: "2016-09-18T14:16:09.828Z"
                },
                {
                    value: 6125,
                    name: "2016-09-22T15:32:13.005Z"
                },
                {
                    value: 6748,
                    name: "2016-09-22T03:29:51.553Z"
                }
            ]
        }
    ];
    constructor(private readonly historicalDataService: HistoricalDataService) {
        this.error$.next(false);
        this.loading$.next(false);
    }

    ngOnInit() {}

    public selectedMachineChanged(tmid: string) {
        this.loading$.next(true);
        this.error$.next(false);
        this.sourceKeys$ = null;
        this.selectedMachine = tmid;
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

    public dateRangeChanged(dateRange: { dateStart: Date; dateEnd: Date }) {
        console.log("date range changed", dateRange);
    }
    public radioChanged(event: Event) {
        if (event && event.target instanceof HTMLInputElement) {
            const ele = event.target as HTMLInputElement;
            console.log(ele.id, ele.value);
            this.sourceKeySelected(ele.id);
        }
    }
    public sourceKeySelected(key: string) {
        this.historicalDataService
            .getHistoricalDataForKey(this.selectedMachine, {
                key,
                limit: 100 
                /*from: "2019-04-17T08:15:29.1234Z",
                to: "2019-04-18T08:15:29.1234Z"*/
            })
            .toPromise()
            .then(console.log);
    }
}
