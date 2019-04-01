import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { SharedModule } from "../shared/shared.module";
import { ScenarioHistoricconditionsRoutingModule } from "./scenario-historicconditions-routing.module";
import { ScenarioHistoricconditionsComponent } from "./scenario-historicconditions.component";
import { HistoricconditionsService } from "./scenario-historicconditions.service";

@NgModule({
  declarations: [ScenarioHistoricconditionsComponent],
  imports: [
    CommonModule,
    ScenarioHistoricconditionsRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  providers: [HistoricconditionsService]
})
export class ScenarioHistoricconditionsModule { }
