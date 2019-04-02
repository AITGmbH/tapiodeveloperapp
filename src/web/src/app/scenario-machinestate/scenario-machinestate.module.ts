import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from "@angular/common";

import { ScenarioMachinestateRoutingModule } from './scenario-machinestate-routing.module';
import { ScenarioMachinestateComponent } from './scenario-machinestate.component';
import { SharedModule } from '../shared/shared.module';
import { ScenarioMachinestateDetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
      ScenarioMachinestateComponent,
      ScenarioMachinestateDetailComponent
    ],
  imports: [
    ScenarioMachinestateRoutingModule,
    SharedModule,
    NgxDatatableModule,
    CommonModule
  ]
})
export class ScenarioMachinestateModule { }
