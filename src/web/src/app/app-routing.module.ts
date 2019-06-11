import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./shared/components/not-found.component";

const routes: Routes = [
  {
    path: "scenario-sample",
    loadChildren: "./scenario-sample/scenario-sample.module#ScenarioSampleModule"
  },
  {
    path: "scenario-machineoverview",
    loadChildren: "./scenario-machineoverview/scenario-machineoverview.module#ScenarioMachineoverviewModule"
  },
  {
    path: "scenario-licenseoverview",
    loadChildren: "./scenario-licenseoverview/scenario-licenseoverview.module#ScenarioLicenseOverviewModule"
  },
  {
    path: "scenario-historicaldata",
    loadChildren: "./scenario-historicaldata/scenario-historicaldata.module#ScenarioHistoricaldataModule"
  },
  {
    path: "scenario-machinestate",
    loadChildren: "./scenario-machinestate/scenario-machinestate.module#ScenarioMachinestateModule"
  },
  {
    path: "scenario-historicconditions",
    loadChildren: "./scenario-historicconditions/scenario-historicconditions.module#ScenarioHistoricconditionsModule"
  },
  {
    path: "scenario-userdata",
    loadChildren: "./scenario-userdata/scenario-userdata.module#ScenarioUserDataModule"
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
