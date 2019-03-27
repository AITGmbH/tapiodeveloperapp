import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { filter, concatMap, tap, map, catchError } from "rxjs/operators";
import {
    HistoricconditionsService,
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
export class ScenarioHistoricconditionsComponent implements OnInit {
    constructor(
        private historicconditionsService: HistoricconditionsService,
        private decimalPipe: DecimalPipe
    ) {}

    private dataChanged$ = new BehaviorSubject<{
        tmid?: string;
        dateStart?: Date;
        dateEnd?: Date;
    }>({});
    public error$ = new BehaviorSubject<boolean>(false);
    public loading$ = new BehaviorSubject<boolean>(false);
    public rows$ = new BehaviorSubject<FlatConditionDataEntry[]>([]);
    public modalContent: string = "";
    ngOnInit() {
        this.dataChanged$
            .pipe(
                filter(obj => {
                    return !!(obj && obj.tmid && obj.dateStart && obj.dateEnd);
                }),
                tap(obj => {
                    this.loading$.next(true);
                    this.error$.next(false);
                }),
                concatMap(data => {
                    return this.historicconditionsService
                        .getHistoricConditions(data.tmid, {
                            from: data.dateStart,
                            to: data.dateEnd
                        })
                        .pipe(
                            catchError((err, caught) => {
                                console.warn(
                                    "error occured while fetching data: ",
                                    err
                                );
                                this.error$.next(true);
                                return of([]);
                            })
                        );
                }),
                map((condDataArr: ConditionData[]) => {
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
                }),
                map((flattenedArray: FlatConditionDataEntry[]) => {
                    return flattenedArray.map(flatCondition => {
                        if (flatCondition.rts_end && flatCondition.rts_start) {
                            const duration = moment.duration(
                                moment(flatCondition.rts_end).diff(
                                    moment(flatCondition.rts_start)
                                )
                            );
                            flatCondition.duration = `${this.decimalPipe.transform(
                                duration.asHours(),
                                "2.0-0"
                            )}:${this.decimalPipe.transform(
                                duration.minutes(),
                                "2.0-0"
                            )}:${this.decimalPipe.transform(
                                duration.seconds(),
                                "2.0-0"
                            )} h`;
                        }
                        return flatCondition;
                    });
                })
            )
            .subscribe({
                next: data => {
                    console.log('got data');
                    this.loading$.next(false);
                    this.rows$.next(data);
                },
                error: err => {
                    this.error$.next(true);
                    this.loading$.next(false);
                    console.warn(
                        "hard error occured while fetching data: ",
                        err
                    );
                }
            });
    }
    public onElementSelected($event: { selected: FlatConditionDataEntry[] }) {
        console.log($event);
        const data =
            $event &&
            $event.selected &&
            $event.selected.length > 0 &&
            $event.selected[0];
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
        this.dataChanged$.next({
            tmid: tmid,
            dateStart: this.dataChanged$.value.dateStart,
            dateEnd: this.dataChanged$.value.dateEnd
        });
    }

    public dateRangeChanged(dateRange: { dateStart: Date; dateEnd: Date }) {
        this.dataChanged$.next({
            tmid: this.dataChanged$.value.tmid,
            dateStart: dateRange.dateStart,
            dateEnd: dateRange.dateEnd
        });
    }
}
