import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LogoutComponent } from "./userdata-logout.component";

const routes: Routes = [
  {
    path: "",
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoutRoutingModule {}
