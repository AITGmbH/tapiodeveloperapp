import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ScenarioLicenseOverviewRoutingModule } from "./scenario-licenseoverview-routing.module";
import { LicenseOverviewComponent } from "./scenario-licenseoverview.component";
import { SharedModule } from "../shared/shared.module";
import { LicenseOverviewService } from './scenario-licenseoverview.service';

@NgModule({
    declarations: [LicenseOverviewComponent],
    providers: [LicenseOverviewService],
    imports: [
      CommonModule, 
      ScenarioLicenseOverviewRoutingModule, 
      SharedModule
    ]
})
export class ScenarioLicenseOverviewModule {}
