import { NgModule } from '@angular/core';

import { ScenarioMachineoverviewRoutingModule } from './scenario-machineoverview-routing.module';
import { ScenarioMachineoverviewComponent } from './scenario-machineoverview.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScenarioMachineoverviewComponent],
  imports: [
    ScenarioMachineoverviewRoutingModule,
    SharedModule
  ]
})
export class ScenarioMachineoverviewModule { }
