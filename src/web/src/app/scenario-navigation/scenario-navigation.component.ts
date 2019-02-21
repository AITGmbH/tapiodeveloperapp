import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ScenarioEntry, ScenarioNavigationService } from './scenario-navigation.service';

/**
 * Displays the available scenario menu entries.
 */
@Component({
    selector: 'app-scenario-navigation',
    templateUrl: './scenario-navigation.component.html',
    styleUrls: ['./scenario-navigation.component.css']
})
export class ScenarioNavigationComponent implements OnInit {
    scenarioEntries$: Observable<ScenarioEntry[]>;

    constructor(private scenarioNavigationService: ScenarioNavigationService) { }

    ngOnInit() {
        this.scenarioNavigationService.getEntries().subscribe((data) => {
            this.scenarioEntries$ = of(data);
        });
    }
}
