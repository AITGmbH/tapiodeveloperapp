import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Provides access to the tapio subscriptions.
 */
@Injectable({ providedIn: 'root' })
export class MachineOverviewService {

    constructor(private http: HttpClient) { }

    getSubscriptions(): Observable<Subscription[]> {
         return this.http.get<SubscriptionsOverview>('/api/machineOverview').pipe(map(r => r.subscriptions));
    }
}

/***
 * Provides an overview of the subscriptions
 */
export interface SubscriptionsOverview {
    totalCount: number;
    subscriptions: Subscription[];
}

/***
 * Provides a single subscription.
 */
export interface Subscription {
    licenses: License[];
    subscriptionId: string;
    name: string;
    tapioId: string;
    assignedMachines: AssignedMachine[];
    subscriptionTypes: string[];
}

export interface AssignedMachine {
    tmid: string;
    displayName: string;
}

export interface License {
    licenseId: string;
    applicationId: string;
    createdDate: string;
    billingStartDate: string;
    billingInterval: string;
    licenseCount: number;
}
