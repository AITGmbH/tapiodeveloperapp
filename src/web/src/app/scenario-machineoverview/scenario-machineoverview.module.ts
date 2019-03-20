import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ScenarioMachineoverviewRoutingModule } from "./scenario-machineoverview-routing.module";
import { ScenarioMachineoverviewComponent } from "./scenario-machineoverview.component";
import { SharedModule } from "../shared/shared.module";
import { MachineOverviewService } from "./scenario-machineoverview.service";

@NgModule({
    declarations: [ScenarioMachineoverviewComponent],
    imports: [CommonModule, ScenarioMachineoverviewRoutingModule, SharedModule],
    providers: [MachineOverviewService]
})
export class ScenarioMachineoverviewModule {}
