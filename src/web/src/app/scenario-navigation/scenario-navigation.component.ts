import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { ScenarioNavigationService } from "./scenario-navigation.service";
import { ScenarioEntry } from "../shared/models/scenario-entity.model";

/**
 * Displays the available scenario menu entries.
 */
@Component({
    selector: "app-scenario-navigation",
    templateUrl: "./scenario-navigation.component.html",
    styleUrls: ["./scenario-navigation.component.css"]
})
export class ScenarioNavigationComponent implements OnInit {
    scenarioEntries$: Observable<ScenarioEntry[]>;

    constructor(private readonly scenarioNavigationService: ScenarioNavigationService) { }

    ngOnInit() {
        this.scenarioNavigationService.getEntries().subscribe((data) => {
            this.scenarioEntries$ = of(data);
        });
    }
}
