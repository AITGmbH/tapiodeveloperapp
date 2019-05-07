import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ScenarioMachineLiveDataComponent } from "./scenario-machinelivedata.component";

const routes: Routes = [
    {
        path: "",
        component: ScenarioMachineLiveDataComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioMachineLiveDataRoutingModule {}
