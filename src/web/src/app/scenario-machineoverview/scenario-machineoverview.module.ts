import { NgModule } from "@angular/core";

import { ScenarioMachineoverviewRoutingModule } from "./scenario-machineoverview-routing.module";
import { ScenarioMachineoverviewComponent } from "./scenario-machineoverview.component";
import { SharedModule } from "../shared/shared.module";
import { MachineOverviewService } from "./scenario-machineoverview.service";

@NgModule({
    declarations: [ScenarioMachineoverviewComponent],
    imports: [
        ScenarioMachineoverviewRoutingModule,
        SharedModule
    ],
    providers: [MachineOverviewService]
})
export class ScenarioMachineoverviewModule {}
