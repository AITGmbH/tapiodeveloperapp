import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ScenarioUserDataComponent } from "./scenario-userdata.component";

const routes: Routes = [
  {
    path: "",
    component: ScenarioUserDataComponent
  },
  {
    path: "logout",
    loadChildren: "./userdata-logout/userdata-logout.module#LogoutModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenarioUserDataRoutingModule {}
