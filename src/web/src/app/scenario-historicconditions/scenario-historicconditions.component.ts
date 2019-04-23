import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, of, Observable } from "rxjs";
import { filter, concatMap, tap, map, catchError } from "rxjs/operators";
import {
    HistoricConditionsService,
    ConditionData,
    FlatConditionDataEntry
} from "./scenario-historicconditions.service";

import * as moment from "moment";
import { DecimalPipe } from "@angular/common";

@Component({
    selector: "app-scenario-historicconditions",
    templateUrl: "./scenario-historicconditions.component.html",
    styleUrls: ["./scenario-historicconditions.component.css"]
})
export class ScenarioHistoricConditionsComponent implements OnInit {
    constructor(private historicConditionsService: HistoricConditionsService, private decimalPipe: DecimalPipe) {}

    private searchCriteria$ = new BehaviorSubject<{
        tmid?: string;
        dateStart?: Date;
        dateEnd?: Date;
    }>({});
    public error$ = new BehaviorSubject<boolean>(false);
    public loading$ = new BehaviorSubject<boolean>(false);
    public rows$ = new BehaviorSubject<FlatConditionDataEntry[]>([]);
    public modalContent: string = "";
    ngOnInit() {
        this.searchCriteria$
            .pipe(
                filter(this.filterIncompleteSearchCriteria()),
                tap(this.setLoadingFlags()),
                concatMap(this.getHistoricConditionsBySearchCriteria()),
                map(this.flattenHistoricConditions()),
                map(this.patchDurationInFlatHistoricConditionData())
            )
            .subscribe({
                next: data => {
                    this.loading$.next(false);
                    this.rows$.next(data);
                },
                error: err => {
                    this.error$.next(true);
                    this.loading$.next(false);
                    console.warn("hard error occured while fetching data: ", err);
                }
            });
    }

    private patchDurationInFlatHistoricConditionData(): (
        flattenedArray: FlatConditionDataEntry[]
    ) => FlatConditionDataEntry[] {
        return (flattenedArray: FlatConditionDataEntry[]) => {
            return flattenedArray.map(flatCondition => {
                // calculate duration if start and end date are known.
                if (flatCondition.rts_end && flatCondition.rts_start) {
                    const duration = moment.duration(
                        moment(flatCondition.rts_end).diff(moment(flatCondition.rts_start))
                    );
                    // format as HH:mm:ss
                    flatCondition.duration = `${this.decimalPipe.transform(
                        duration.asHours(),
                        "2.0-0"
                    )}:${this.decimalPipe.transform(duration.minutes(), "2.0-0")}:${this.decimalPipe.transform(
                        duration.seconds(),
                        "2.0-0"
                    )} h`;
                }
                return flatCondition;
            });
        };
    }

    private flattenHistoricConditions(): (condDataArr: ConditionData[]) => FlatConditionDataEntry[] {
        return (condDataArr: ConditionData[]) => {
            return [
                ...condDataArr.map(condData => {
                    return condData.values.map(
                        value =>
                            Object.assign(
                                {
                                    key: condData.key,
                                    provider: condData.provider
                                },
                                value
                            ) as FlatConditionDataEntry
                    );
                })
            ].reduce((arr, curr) => {
                // flatten
                return [...arr, ...curr];
            }, []);
        };
    }

    private getHistoricConditionsBySearchCriteria(): (data: {
        tmid: string;
        dateStart: Date;
        dateEnd: Date;
    }) => Observable<ConditionData[]> {
        return (data: { tmid: string; dateStart: Date; dateEnd: Date }) => {
            return this.historicConditionsService
                .getHistoricConditions(data.tmid, {
                    from: data.dateStart,
                    to: data.dateEnd
                })
                .pipe(
                    catchError((err, caught) => {
                        console.warn("error occured while fetching data: ", err);
                        this.error$.next(true);
                        return of([]);
                    })
                );
        };
    }

    private setLoadingFlags(): () => void {
        return () => {
            this.loading$.next(true);
            this.error$.next(false);
        };
    }

    private filterIncompleteSearchCriteria(): (obj: { tmid?: string; dateStart?: Date; dateEnd?: Date }) => boolean {
        return (obj: { tmid?: string; dateStart?: Date; dateEnd?: Date }) => {
            return !!(obj && obj.tmid && obj.dateStart && obj.dateEnd);
        };
    }

    public onElementSelected($event: { selected: FlatConditionDataEntry[] }) {
        const data = $event && $event.selected && $event.selected.length > 0 && $event.selected[0];
        if (data) {
            const origElement: ConditionData = {
                key: data.key,
                provider: data.provider,
                values: [
                    {
                        sts: data.sts,
                        rts_utc_start: data.rts_utc_start,
                        rts_start: data.rts_start,
                        rts_utc_end: data.rts_utc_end,
                        rts_end: data.rts_end,
                        rts_utc_end_quality: data.rts_utc_end_quality,
                        p: data.p,
                        k: data.k,
                        s: data.s,
                        sv: data.sv,
                        ls: data.ls,
                        lm: data.lm,
                        vls: data.vls
                    }
                ]
            };
            this.modalContent = JSON.stringify(origElement, null, 2);
        }
    }
    public selectedMachineChanged(tmid: string) {
        this.searchCriteria$.next({
            tmid: tmid,
            dateStart: this.searchCriteria$.value.dateStart,
            dateEnd: this.searchCriteria$.value.dateEnd
        });
    }

    public dateRangeChanged(dateRange: { dateStart: Date; dateEnd: Date }) {
        this.searchCriteria$.next({
            tmid: this.searchCriteria$.value.tmid,
            dateStart: dateRange.dateStart,
            dateEnd: dateRange.dateEnd
        });
    }
}
