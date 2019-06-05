import { NgModule } from "@angular/core";

import { ScenarioLicenseOverviewRoutingModule } from "./scenario-licenseoverview-routing.module";
import { LicenseOverviewComponent } from "./scenario-licenseoverview.component";
import { SharedModule } from "../shared/shared.module";
import { LicenseOverviewService } from "./scenario-licenseoverview.service";

@NgModule({
    declarations: [LicenseOverviewComponent],
    providers: [LicenseOverviewService],
    imports: [ScenarioLicenseOverviewRoutingModule, SharedModule]
})
export class ScenarioLicenseOverviewModule {}
