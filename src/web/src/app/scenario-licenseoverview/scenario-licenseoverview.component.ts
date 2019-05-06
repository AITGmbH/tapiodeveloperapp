import { Component, OnInit } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { Subscription } from "../shared/models/subscription.model";
import { LicenseOverviewService } from "./scenario-licenseoverview.service";
import { catchError } from "rxjs/operators";

@Component({
    selector: "app-scenario-licenseoverview",
    templateUrl: "./scenario-licenseoverview.component.html",
    styleUrls: ["./scenario-licenseoverview.component.css"]
})
export class LicenseOverviewComponent implements OnInit {
    subscriptions$: Observable<Subscription[]>;
    error$ = new Subject<boolean>();

    constructor(private licenseOverviewService: LicenseOverviewService) {
        this.error$.next(false);
    }

    ngOnInit() {
        this.subscriptions$ = this.licenseOverviewService.getSubscriptions().pipe(
            catchError(error => {
                console.error("could not load subscriptions", error);
                this.error$.next(true);
                return of([]);
            })
        );
    }
}
