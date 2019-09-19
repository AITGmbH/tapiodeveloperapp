import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AssignedMachine } from "../models/assigned-machine.model";
import { SubscriptionsOverview } from "../models/subscription-overview.model";

/**
 * Provides access to the available machines of all tapio subscriptions.
 */
@Injectable()
export class AvailableMachinesService {
    constructor(private readonly http: HttpClient) {}

    /**
     * retrieves a flat array of all assigned machines
     */
    public getMachines(): Observable<AssignedMachine[]> {
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
