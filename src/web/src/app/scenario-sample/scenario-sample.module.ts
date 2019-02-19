import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenarioSampleRoutingModule } from './scenario-sample-routing.module';
import { ScenarioSampleComponent } from './scenario-sample.component';

@NgModule({
  declarations: [ScenarioSampleComponent],
  imports: [
    CommonModule,
    ScenarioSampleRoutingModule
  ]
})
export class ScenarioSampleModule { }
