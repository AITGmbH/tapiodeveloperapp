import { Component, OnInit, ViewChild } from "@angular/core";
import { MachineStateService, ItemData, Condition } from "../scenario-machinestate-service";
import { ActivatedRoute } from "@angular/router";
import { Observable, of, Subject, Subscription } from "rxjs";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { DomSanitizer } from "@angular/platform-browser";

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
        this.id$.subscribe(id => {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.subscription = this.machineStateService.getLastKnownStateFromMachine(id).subscribe(
                lastKnownState => {
                    this.itemData$ = of(lastKnownState.itds);
                    this.conditions$ = of(lastKnownState.conds);
                },
                _ => {
                    this.hasError = true;
                }
            );
        });

        this.route.params.subscribe(params => {
            this.id$.next(params.tmid as string);
        });
    }
}
