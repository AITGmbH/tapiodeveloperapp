import { NgModule } from "@angular/core";

import { ScenarioUserDataRoutingModule } from "./scenario-userdata-routing.module";
import { ScenarioUserDataComponent } from "./scenario-userdata.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ScenarioUserDataComponent],
  imports: [ScenarioUserDataRoutingModule, SharedModule]
})
export class ScenarioUserDataModule {}
