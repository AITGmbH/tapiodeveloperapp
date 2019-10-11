import { Component, OnInit } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Subscription } from "../shared/models/subscription.model";
import { LicenseOverviewService } from "./scenario-licenseoverview.service";
import { catchError } from "rxjs/operators";

@Component({
    selector: "app-scenario-licenseoverview",
    templateUrl: "./scenario-licenseoverview.component.html",
    styleUrls: ["./scenario-licenseoverview.component.scss"]
})
export class LicenseOverviewComponent implements OnInit {
    subscriptions$: Observable<Subscription[]>;
    error$ = new BehaviorSubject<boolean>(false);

    constructor(private readonly licenseOverviewService: LicenseOverviewService) {}

    ngOnInit() {
        this.subscriptions$ = this.licenseOverviewService.getSubscriptions().pipe(
            catchError(error => {
                console.error("could not load subscriptions", error);
                this.error$.next(true);
                return of(null);
            })
        );
    }
}
