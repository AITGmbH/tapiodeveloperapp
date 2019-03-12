import { NgModule } from '@angular/core';

import { ScenarioMachinestateRoutingModule } from './scenario-machinestate-routing.module';
import { ScenarioMachinestateComponent } from './scenario-machinestate.component';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
      ScenarioMachinestateComponent,
      DetailComponent
    ],
  imports: [
    ScenarioMachinestateRoutingModule,
    SharedModule
  ]
})
export class ScenarioMachinestateModule { }
