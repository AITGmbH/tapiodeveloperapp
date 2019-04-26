import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Subscription } from "../shared/models/subscription.model";
import { SubscriptionsOverview } from "../shared/models/subscription-overview.model";
 
/**
 * Provides access to the tapio subscriptions.
 */
@Injectable()
export class MachineOverviewService {
    constructor(private readonly http: HttpClient) { }

    public getSubscriptions(): Observable<Subscription[]> {
         return this.http.get<SubscriptionsOverview>("/api/machineOverview")
         .pipe(map(r => r.subscriptions));
    }
}

