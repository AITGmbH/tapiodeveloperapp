import { NgModule } from "@angular/core";
import { MachineCommandsComponent } from "./scenario-machinecommands.component";
import { MachineCommandsService } from "./scenario-machinecommands.service";
import { ScenarioMachineCommandsRoutingModule } from "./scenario-machinecommands-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [MachineCommandsComponent],
    providers: [MachineCommandsService],
    imports: [ScenarioMachineCommandsRoutingModule, SharedModule]
})
export class ScenarioMachineCommandsModule {}
