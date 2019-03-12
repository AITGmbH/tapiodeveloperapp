import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Provides access to the tapio machine state.
 */
@Injectable({ providedIn: 'root' })
export class MachineStateService {

    constructor(private http: HttpClient) { }

    getMachines(): Observable<AssignedMachine[]> {
        return this.http.get<SubscriptionsOverview>('/api/machineOverview/').pipe(map(overview => {
            return [].concat(...overview.subscriptions.map(subscription => subscription.assignedMachines));
        }));
    }

    getMachineState(machineId: string): Observable<any[]> {
         return this.http.get<any[]>('/api/machineState/' + machineId);
    }
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
