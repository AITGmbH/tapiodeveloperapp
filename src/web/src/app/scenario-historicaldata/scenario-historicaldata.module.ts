import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenarioHistoricaldataRoutingModule } from './scenario-historicaldata-routing.module';
import { ScenarioHistoricaldataComponent } from './scenario-historicaldata.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ScenarioHistoricaldataComponent],
  imports: [
    CommonModule,
    ScenarioHistoricaldataRoutingModule,
    SharedModule,
    NgSelectModule
  ]
})
export class ScenarioHistoricaldataModule { }
