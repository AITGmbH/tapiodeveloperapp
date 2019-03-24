import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, concat, Subject } from "rxjs";
import { filter, concatMap, tap, map } from "rxjs/operators";
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
    public rows$ = new BehaviorSubject<FlatConditionDataEntry[]>([]);
    ngOnInit() {
        this.dataChanged$
            .pipe(
                tap(obj => console.log("1", obj)),
                filter(obj => {
                    return !!(obj && obj.tmid && obj.dateStart && obj.dateEnd);
                }),
                tap(obj => console.log("2", obj)),
                concatMap(data => {
                    return this.historicconditionsService.getHistoricConditions(
                        data.tmid,
                        { from: data.dateStart, to: data.dateEnd }
                    );
                }),
                tap(obj => console.log("3", obj)),
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
                tap(obj => console.log("4", obj)),
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
            .subscribe(
                data => {
                    this.rows$.next(data);
                },
                err => {
                    console.warn("error occured while fetching data: ", err);
                }
            );
    }

    public selectedMachineChanged(tmid: string) {
        console.log("selected machine changed", tmid);
        this.dataChanged$.next({
            tmid: tmid,
            dateStart: this.dataChanged$.value.dateStart,
            dateEnd: this.dataChanged$.value.dateEnd
        });
    }

    public dateRangeChanged(dateRange: { dateStart: Date; dateEnd: Date }) {
        console.log("date range changed", dateRange);
        this.dataChanged$.next({
            tmid: this.dataChanged$.value.tmid,
            dateStart: dateRange.dateStart,
            dateEnd: dateRange.dateEnd
        });
    }
}
