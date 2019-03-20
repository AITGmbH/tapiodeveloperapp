import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SourceKeys } from "./source-keys.model";

/**
 * Provides access to the tapio subscriptions.
 */
@Injectable()
export class HistoricalDataService {
    constructor(private http: HttpClient) {}

    public getSourceKeys(machineId: string): Observable<SourceKeys> {
        return this.http.get<SourceKeys>(`/api/historicalData/${machineId}`);
    }
}
