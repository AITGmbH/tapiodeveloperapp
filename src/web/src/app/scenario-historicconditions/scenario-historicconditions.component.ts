import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scenario-historicconditions',
  templateUrl: './scenario-historicconditions.component.html',
  styleUrls: ['./scenario-historicconditions.component.css']
})
export class ScenarioHistoricconditionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public selectedMachineChanged(tmid: string) {
    console.log('selected machine changed', tmid);
  }

  public dateRangeChanged(dateRange: {dateStart: Date, dateEnd: Date}){
    console.log('date range changed', dateRange);
  }

}
