import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import { SourceKeys } from "./source-keys.model";
import { HistoricalDataService } from "./scenario-historicaldata.service";
import { HistoricalDataResponseElement, HistoricItemData } from "./historical-data.model";
import { filter, concatMap, tap, map, catchError } from "rxjs/operators";
import * as moment from "moment";
@Component({
    selector: "app-scenario-historicaldata",
    templateUrl: "./scenario-historicaldata.component.html",
    styleUrls: ["./scenario-historicaldata.component.css"]
})
export class ScenarioHistoricaldataComponent implements OnInit {
    private searchCriteria$ = new BehaviorSubject<ScenarionHistoricaldataSearchCriteria>({
        data: {
            // initial value, maybe add input
            limit: 1000
        }
    });
    sourceKeys$: Observable<SourceKeys>;
    error$ = new Subject<boolean>();
    loading$ = new Subject<boolean>();
    lineSeriesData: LineSeriesData[];

    constructor(private readonly historicalDataService: HistoricalDataService) {
        this.error$.next(false);
        this.loading$.next(false);
    }

    ngOnInit() {
        this.searchCriteria$
            .pipe(
                filter(this.filterIncompleteSearchCriteria()),
                tap(this.setLoadingFlags()),
                concatMap(this.getHistoricalDataBySearchCriteria()),
                map(this.transformHistoricalDataToLineSeries())
            )
            .subscribe({
                next: (data: LineSeriesData[]) => {
                    this.loading$.next(false);
                    const entryCount = data.reduce((count, val) => {
                        return count + val.series.length;
                    }, 0);
                    if (entryCount > 0) {
                        this.error$.next(false);
                        this.lineSeriesData = data;
                    } else {
                        this.error$.next(true);
                        this.lineSeriesData = null;
                    }
                },
                error: err => {
                    this.error$.next(true);
                    this.loading$.next(false);
                    console.warn("hard error occured while fetching data: ", err);
                }
            });
    }

    private transformHistoricalDataToLineSeries(): (
        value?: HistoricalDataResponseElement
    ) => LineSeriesData[] {
        return (responseElement?: HistoricalDataResponseElement): LineSeriesData[] => {
            if (!responseElement) {
                return [];
            }
            return [
                {
                    name: responseElement.key,
                    series: responseElement.values
                        // filter out non-numeric values
                        .filter(
                            (itemData: HistoricItemData) =>
                                typeof itemData.vNum === "number"
                        )
                        // transform to series element
                        .map((itemData: HistoricItemData) => ({
                            value: itemData.vNum,
                            name: moment(itemData.sts).toDate()
                        }))
                }
            ];
        };
    }

    private filterIncompleteSearchCriteria(): (
        value: ScenarionHistoricaldataSearchCriteria
    ) => boolean {
        return (obj: ScenarionHistoricaldataSearchCriteria) => {
            return !!(
                obj &&
                obj.machineId &&
                obj.data.key &&
                obj.data.from &&
                obj.data.to &&
                obj.data.limit
            );
        };
    }

    public selectedMachineChanged(tmid: string) {
        this.error$.next(false);
        this.loading$.next(true);
        this.sourceKeys$ = null;
        this.searchCriteria$.next({
            // set new key
            machineId: tmid,
            data: {
                // reset key, as the old one is invalid from now on.
                key: null,
                from: this.searchCriteria$.value.data.from,
                to: this.searchCriteria$.value.data.to,
                limit: this.searchCriteria$.value.data.limit
            }
        });
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
        this.searchCriteria$.next({
            machineId: this.searchCriteria$.value.machineId,
            data: {
                key: this.searchCriteria$.value.data.key,
                from: dateRange.dateStart.toISOString(),
                to: dateRange.dateEnd.toISOString(),
                limit: this.searchCriteria$.value.data.limit
            }
        });
    }

    public radioChanged(event: Event) {
        if (event && event.target instanceof HTMLInputElement) {
            const ele = event.target as HTMLInputElement;
            this.sourceKeySelected(ele.id);
        }
    }

    public sourceKeySelected(key: string) {
        this.searchCriteria$.next({
            machineId: this.searchCriteria$.value.machineId,
            data: {
                key,
                from: this.searchCriteria$.value.data.from,
                to: this.searchCriteria$.value.data.to,
                limit: this.searchCriteria$.value.data.limit
            }
        });
    }

    private setLoadingFlags(): () => void {
        return () => {
            this.loading$.next(true);
            this.error$.next(false);
        };
    }

    private getHistoricalDataBySearchCriteria(): (
        obj: ScenarionHistoricaldataSearchCriteria
    ) => Observable<HistoricalDataResponseElement | null> {
        return (obj: ScenarionHistoricaldataSearchCriteria) => {
            return this.historicalDataService
                .getHistoricalDataForKey(obj.machineId, {
                    key: obj.data.key,
                    from: obj.data.from,
                    to: obj.data.to,
                    limit: obj.data.limit
                })
                .pipe(
                    catchError((err, caught) => {
                        console.warn("error occured while fetching data: ", err);
                        this.error$.next(true);
                        return of(null);
                    })
                );
        };
    }
}

interface ScenarionHistoricaldataSearchCriteria {
    machineId?: string;
    data: { key?: string; from?: string; to?: string; limit?: number };
}
interface LineSeriesData {
    name: string;
    series: { value: number; name: string | Date | number }[];
}
