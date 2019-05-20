import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ScenarioHistoricaldataRoutingModule } from "./scenario-historicaldata-routing.module";
import { ScenarioHistoricaldataComponent } from "./scenario-historicaldata.component";
import { HistoricalDataService } from "./scenario-historicaldata.service";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
    declarations: [ScenarioHistoricaldataComponent],
    imports: [
        CommonModule,
        ScenarioHistoricaldataRoutingModule,
        SharedModule,
        NgxChartsModule
    ],
    providers: [HistoricalDataService]
})
export class ScenarioHistoricaldataModule {}
