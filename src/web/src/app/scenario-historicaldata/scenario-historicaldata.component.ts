import { Component, OnInit } from '@angular/core';
import { MachineOverviewService } from '../scenario-machineoverview/scenario-machineoverview-service';
import { HistoricalDataService } from './scenario-historicaldata-service';

@Component({
  selector: 'app-scenario-historicaldata',
  templateUrl: './scenario-historicaldata.component.html',
  styleUrls: ['./scenario-historicaldata.component.css']
})
export class ScenarioHistoricaldataComponent implements OnInit {

    constructor(private machineOverviewService: MachineOverviewService, private historicalDataService: HistoricalDataService) { }

    ngOnInit() {
  }

}
