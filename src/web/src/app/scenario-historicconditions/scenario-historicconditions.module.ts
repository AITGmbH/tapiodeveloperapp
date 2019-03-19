import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenarioHistoricconditionsRoutingModule } from './scenario-historicconditions-routing.module';
import { ScenarioHistoricconditionsComponent } from './scenario-historicconditions.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ScenarioHistoricconditionsComponent],
  imports: [
    CommonModule,
    ScenarioHistoricconditionsRoutingModule,
    SharedModule
  ]
})
export class ScenarioHistoricconditionsModule { }
