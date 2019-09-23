import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ScenarioNavigationService } from "./scenario-navigation.service";
import { ScenarioEntry } from "../shared/models/scenario-entity.model";
import { NavigationService } from "../shared/services/navigation.service";

/**
 * Displays the available scenario menu entries.
 */
@Component({
    selector: "[app-scenario-navigation]",
    templateUrl: "./scenario-navigation.component.html",
    styleUrls: ["./scenario-navigation.component.scss"]
})
export class ScenarioNavigationComponent implements OnInit {
    private readonly scenarioEntries: BehaviorSubject<ScenarioEntry[]> = new BehaviorSubject<ScenarioEntry[]>([]);
    scenarioEntries$ = this.scenarioEntries.asObservable();

    constructor(
        private readonly scenarioNavigationService: ScenarioNavigationService,
        private readonly navigationService: NavigationService
    ) {}

    ngOnInit() {
        this.scenarioNavigationService.getEntries().subscribe(data => {
            this.scenarioEntries.next(data);
        });
    }

    public selectEntry() {
        this.navigationService.toggleMenu();
    }
}
