import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ScenarioEntry, ScenarioService } from './scenario.service';

@Component({
    selector: 'app-scenario-navigation',
    templateUrl: './scenario-navigation.component.html',
    styleUrls: ['./scenario-navigation.component.css']
})
export class ScenarioNavigationComponent implements OnInit {
    moduleEntries$: Observable<ScenarioEntry[]>;

    constructor(private scenarioService: ScenarioService) { }

    ngOnInit() {
        this.scenarioService.getModules().subscribe((data) => {
            this.moduleEntries$ = of(data);
        });
    }
}
