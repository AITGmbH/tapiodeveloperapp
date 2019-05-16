import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import { MachineOverviewService } from "./scenario-machineoverview.service";
import { Subscription } from "../shared/models/subscription.model";
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: "app-scenario-machineoverview",
  templateUrl: "./scenario-machineoverview.component.html"
})
export class ScenarioMachineoverviewComponent implements OnInit {
    subscriptions$: Observable<Subscription[]>;
    error$ = new Subject<boolean>();
    loading$ = new BehaviorSubject<boolean>(false);

    constructor(private readonly machineOverviewService: MachineOverviewService) { }

    ngOnInit() {
        this.loading$.next(true);
        this.subscriptions$ = this.machineOverviewService.getSubscriptions().pipe(
            tap(() => {
                this.loading$.next(false);
            }),
            catchError(error => {
                console.error("could not load subscriptions", error);
                this.error$.next(true);
                return of(null);
            })
        )
    }
}
