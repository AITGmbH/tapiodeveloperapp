import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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
        loadChildren:
            "./scenario-historicconditions/scenario-historicconditions.module#ScenarioHistoricconditionsModule"
    },
    {
        path: "scenario-machinelivedata",
        loadChildren: "./scenario-machinelivedata/scenario-machinelivedata.module#ScenarioMachineLiveDataModule"
    },
    {
        path: "**",
        redirectTo: "scenario-sample"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
