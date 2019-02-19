import { Component, OnInit } from '@angular/core';
import { VERSION } from 'src/environments/version';

@Component({
  selector: 'app-scenario-sample',
  templateUrl: './scenario-sample.component.html',
  styleUrls: ['./scenario-sample.component.css']
})
export class ScenarioSampleComponent implements OnInit {

    version: any;
    constructor() {
        this.version = VERSION.hash;
    }

    ngOnInit() {
    }
}
