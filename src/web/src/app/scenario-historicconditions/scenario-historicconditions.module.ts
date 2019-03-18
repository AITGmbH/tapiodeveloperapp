import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenarioHistoricconditionsRoutingModule } from './scenario-historicconditions-routing.module';
import { ScenarioHistoricconditionsComponent } from './scenario-historicconditions.component';

@NgModule({
  declarations: [ScenarioHistoricconditionsComponent],
  imports: [
    CommonModule,
    ScenarioHistoricconditionsRoutingModule
  ]
})
export class ScenarioHistoricconditionsModule { }
