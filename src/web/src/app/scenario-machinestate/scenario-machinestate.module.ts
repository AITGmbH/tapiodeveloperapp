import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ScenarioMachinestateRoutingModule } from "./scenario-machinestate-routing.module";
import { ScenarioMachinestateComponent } from "./scenario-machinestate.component";
import { SharedModule } from "../shared/shared.module";
import { ScenarioMachinestateDetailComponent } from "./detail/detail.component";
import { MachineStateService } from "./scenario-machinestate-service";

@NgModule({
    declarations: [ScenarioMachinestateComponent, ScenarioMachinestateDetailComponent],
    imports: [ScenarioMachinestateRoutingModule, SharedModule, CommonModule],
    providers: [MachineStateService]
})
export class ScenarioMachinestateModule {}
