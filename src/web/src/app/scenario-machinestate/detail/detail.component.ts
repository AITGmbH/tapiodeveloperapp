import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
    MachineStateService,
    ItemData,
    Condition
} from "../scenario-machinestate-service";
import { ActivatedRoute } from "@angular/router";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
    selector: "app-scenario-machinestate-detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.css"]
})
export class ScenarioMachinestateDetailComponent implements OnInit {
    id$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    itemData$: Observable<ItemData[]>;
    conditions$: Observable<Condition[]>;
    isLoading = true;
    hasError: boolean;
    @ViewChild("itemData") itemData: DatatableComponent;
    @ViewChild("conditions") conditions: DatatableComponent;

    constructor(
        private readonly machineStateService: MachineStateService,
        private readonly route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const defaultMessage = "No data to display";

        this.id$.subscribe(id => {
            if (!id){
                return;
            }

            this.machineStateService.getLastKnownStateFromMachine(id).subscribe(
                lastKnownState => {
                    this.itemData$ = of(lastKnownState.itds);
                    this.conditions$ = of(lastKnownState.conds);
                    this.itemData.messages.emptyMessage = defaultMessage;
                    this.conditions.messages.emptyMessage = defaultMessage;
                    this.isLoading = false;
                },
                _ => {
                    this.isLoading = false;
                    this.hasError = true;
                    this.itemData.messages.emptyMessage = "";
                    this.conditions.messages.emptyMessage = "";
                }
            );
        });

        this.route.params.subscribe(params => {
            this.isLoading = true;
            this.id$.next(params.tmid as string);
        });
    }
}
