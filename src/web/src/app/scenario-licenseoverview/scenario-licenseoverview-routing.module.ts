import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LicenseOverviewComponent } from "./scenario-licenseoverview.component";

const routes: Routes = [
    {
        path: "",
        component: LicenseOverviewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioLicenseOverviewRoutingModule {}
