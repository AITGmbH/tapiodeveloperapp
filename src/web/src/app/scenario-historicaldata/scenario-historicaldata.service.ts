import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SourceKeys } from "./source-keys.model";
import { HistoricalDataResponse, HistoricalDataResponseElement } from "./historical-data.model";
import { map } from "rxjs/operators";

/**
 * Provides access to the historical data of a source key of a machine.
 */
@Injectable()
export class HistoricalDataService {
    constructor(private readonly http: HttpClient) {}

    public getSourceKeys(machineId: string): Observable<SourceKeys> {
        return this.http.get<SourceKeys>(`/api/historicalData/${machineId}`);
    }

    public getHistoricalData(
        machineId: string,
        data: {
            keys: string[];
            from?: string;
            to?: string;
            limit?: number;
        }
    ): Observable<HistoricalDataResponse> {
        return this.http.post<HistoricalDataResponse>(
            `/api/historicalData/${machineId}`,
            data
        );
    }
    public getHistoricalDataForKey(
        machineId: string,
        data: {
            key: string;
            from?: string;
            to?: string;
            limit?: number;
        }
    ): Observable<HistoricalDataResponseElement | null> {
        return (
            this.getHistoricalData(machineId, {
                keys: [data.key],
                from: data.from,
                to: data.to,
                limit: data.limit
            })
                // get first matching - should in theory just match resp.values[0]
                .pipe(map(respItem => respItem.values.find(entry => entry.key === data.key)))
        );
    }
}
