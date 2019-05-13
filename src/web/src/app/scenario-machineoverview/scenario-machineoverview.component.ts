import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { MachineOverviewService } from "./scenario-machineoverview.service";
import { Subscription } from "../shared/models/subscription.model";

@Component({
  selector: "app-scenario-machineoverview",
  templateUrl: "./scenario-machineoverview.component.html"
})
export class ScenarioMachineoverviewComponent implements OnInit {
    subscriptions$: Observable<Subscription[]>;
    error$ = new Subject<boolean>();

    constructor(private readonly machineOverviewService: MachineOverviewService) { }

    ngOnInit() {
        this.machineOverviewService.getSubscriptions().subscribe(subscriptions => {
            this.subscriptions$ = of(subscriptions);
        }, error => {
            console.error("could not load machine overview", error);
            this.error$.next(true);
        });
    }
}
