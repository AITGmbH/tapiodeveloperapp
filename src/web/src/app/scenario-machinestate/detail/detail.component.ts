import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
    MachineStateService,
    ItemData,
    Condition
} from "../scenario-machinestate-service";
import { ActivatedRoute } from "@angular/router";
import { Observable, of, BehaviorSubject, Subject, Subscription } from "rxjs";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: "app-scenario-machinestate-detail",
    templateUrl: "./detail.component.html"
})
export class ScenarioMachinestateDetailComponent implements OnInit {
    id$: Subject<string> = new Subject<string>();
    itemData$: Observable<ItemData[]>;
    conditions$: Observable<Condition[]>;
    hasError: boolean;
    @ViewChild("itemData") itemData: DatatableComponent;
    @ViewChild("conditions") conditions: DatatableComponent;
    private subscription: Subscription;

    constructor(
        private readonly machineStateService: MachineStateService,
        private readonly route: ActivatedRoute,
        public readonly domSanitizerService: DomSanitizer
    ) {}

    ngOnInit(): void {
        const defaultMessage = "No data to display";
        const errorMessage = "Error - No data to display";

        this.id$.subscribe(id => {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.subscription = this.machineStateService.getLastKnownStateFromMachine(id).subscribe(
                lastKnownState => {
                    this.itemData$ = of(lastKnownState.itds);
                    this.conditions$ = of(lastKnownState.conds);
                    this.itemData.messages.emptyMessage = defaultMessage;
                    this.conditions.messages.emptyMessage = defaultMessage;
                },
                _ => {
                    this.hasError = true;
                    this.itemData.messages.emptyMessage = errorMessage;
                    this.conditions.messages.emptyMessage = errorMessage;
                }
            );
        });

        this.route.params.subscribe(params => {
            this.id$.next(params.tmid as string);
        });
    }
}