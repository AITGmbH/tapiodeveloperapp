import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ScenarioHistoricConditionsComponent } from "./scenario-historicconditions.component";

const routes: Routes = [
    {
        path: "",
        component: ScenarioHistoricConditionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioHistoricconditionsRoutingModule {}
