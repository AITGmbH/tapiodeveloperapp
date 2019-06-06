import { NgModule } from "@angular/core";
import { ScenarioMachinestateRoutingModule } from "./scenario-machinestate-routing.module";
import { ScenarioMachinestateComponent } from "./scenario-machinestate.component";
import { SharedModule } from "../shared/shared.module";
import { ScenarioMachinestateDetailComponent } from "./detail/detail.component";
import { MachineStateService } from "./scenario-machinestate-service";

@NgModule({
    declarations: [ScenarioMachinestateComponent, ScenarioMachinestateDetailComponent],
    imports: [ScenarioMachinestateRoutingModule, SharedModule],
    providers: [MachineStateService]
})
export class ScenarioMachinestateModule {}
