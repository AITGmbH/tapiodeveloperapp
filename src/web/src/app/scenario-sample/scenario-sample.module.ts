import { NgModule } from '@angular/core';

import { ScenarioSampleRoutingModule } from './scenario-sample-routing.module';
import { ScenarioSampleComponent } from './scenario-sample.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScenarioSampleComponent],
  imports: [
    ScenarioSampleRoutingModule,
    SharedModule
  ]
})
export class ScenarioSampleModule { }
