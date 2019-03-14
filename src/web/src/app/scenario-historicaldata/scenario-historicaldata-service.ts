import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

/**
 * Provides access to the tapio subscriptions.
 */
@Injectable({ providedIn: "root" })
export class HistoricalDataService {
    constructor(private http: HttpClient) {}

    getSourceKeys(machineId: string): Observable<SourceKeysResponse[]> {
        return this.http
            .get<SourceKeysResponse>(`/api/historicalData/${machineId}`)
            .pipe(
                map(resp => {
                    return [].concat(...resp.keys);
                })
            );
    }
    getMachines(): Observable<AssignedMachine[]> {
        return this.http
            .get<SubscriptionsOverview>("/api/machineOverview/")
            .pipe(
                map(overview => {
                    return [].concat(
                        ...overview.subscriptions.map(
                            subscription => subscription.assignedMachines
                        )
                    );
                })
            );
    }
}

export interface SourceKeysResponse {
    machineId: string;
    keys: string[];
}

/***
 * Provides an overview of the subscriptions
 */
export interface SubscriptionsOverview {
    subscriptions: Subscription[];
}

/***
 * Provides a single subscription.
 */
export interface Subscription {
    assignedMachines: AssignedMachine[];
}

export interface AssignedMachine {
    tmid: string;
    displayName: string;
}
