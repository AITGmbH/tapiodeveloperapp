import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ScenarioHistoricaldataRoutingModule } from "./scenario-historicaldata-routing.module";
import { ScenarioHistoricaldataComponent } from "./scenario-historicaldata.component";
import { HistoricalDataService } from "./scenario-historicaldata.service";

@NgModule({
    declarations: [ScenarioHistoricaldataComponent],
    imports: [ScenarioHistoricaldataRoutingModule, SharedModule],
    providers: [HistoricalDataService]
})
export class ScenarioHistoricaldataModule {}
