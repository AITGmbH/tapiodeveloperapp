import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
    SharedModule,
    NgxDatatableModule
  ]
})
export class ScenarioMachinestateModule { }
