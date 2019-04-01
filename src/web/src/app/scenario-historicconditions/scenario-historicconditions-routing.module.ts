import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ScenarioHistoricconditionsComponent } from "./scenario-historicconditions.component";

const routes: Routes = [{
        path: "",
    component: ScenarioHistoricconditionsComponent
               }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenarioHistoricconditionsRoutingModule { }
