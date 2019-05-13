import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenarioUserDataRoutingModule } from './scenario-userdata-routing.module';
import { ScenarioUserDataComponent } from './scenario-userdata.component';
import { UserdataDetailComponent } from './userdata-detail/userdata-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScenarioUserDataComponent, UserdataDetailComponent],
  imports: [
    CommonModule,
    ScenarioUserDataRoutingModule,
    SharedModule
  ]
})
export class ScenarioUserDataModule { }
