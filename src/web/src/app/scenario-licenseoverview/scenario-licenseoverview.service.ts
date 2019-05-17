import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../shared/models/subscription.model';
import { SubscriptionsOverview } from '../shared/models/subscription-overview.model';
import { map } from 'rxjs/operators';

@Injectable()
export class LicenseOverviewService {
    constructor(private readonly http: HttpClient) {}

    public getSubscriptions(): Observable<Subscription[]> {
      return this.http.get<SubscriptionsOverview>("/api/licenseOverview")
      .pipe(map(r => r.subscriptions));
 }
}
