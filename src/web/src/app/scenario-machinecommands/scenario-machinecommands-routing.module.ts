import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MachineCommandsComponent } from "./scenario-machinecommands.component";

const routes: Routes = [
    {
        path: "",
        component: MachineCommandsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioMachineCommandsRoutingModule {}
