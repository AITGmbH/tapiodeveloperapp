import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule,
    ScenarioMachinestateRoutingModule,
    SharedModule
  ]
})
export class ScenarioMachinestateModule { }
