import { NgModule } from "@angular/core";
import { MachineCommandsComponent } from "./scenario-machinecommands.component";
import { MachineCommandsService } from "./scenario-machinecommands.service";
import { ScenarioMachineCommandsRoutingModule } from "./scenario-machinecommands-routing.module";
import { SharedModule } from "../shared/shared.module";
import { MachineCommandContainerComponent } from "./machine-command-container/machine-command-container.component";

@NgModule({
    declarations: [MachineCommandsComponent, MachineCommandContainerComponent],
    providers: [MachineCommandsService],
    imports: [ScenarioMachineCommandsRoutingModule, SharedModule]
})
export class ScenarioMachineCommandsModule {}
