import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { SharedModule } from "../shared/shared.module";
import { ScenarioHistoricconditionsRoutingModule } from "./scenario-historicconditions-routing.module";
import { ScenarioHistoricConditionsComponent } from "./scenario-historicconditions.component";
import { HistoricConditionsService } from "./scenario-historicconditions.service";

@NgModule({
  declarations: [ScenarioHistoricConditionsComponent],
  imports: [
    CommonModule,
    ScenarioHistoricconditionsRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  providers: [HistoricConditionsService]
})
export class ScenarioHistoricconditionsModule { }
