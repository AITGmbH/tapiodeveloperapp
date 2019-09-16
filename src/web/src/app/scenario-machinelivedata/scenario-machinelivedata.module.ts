import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ScenarioMachineLiveDataComponent } from "./scenario-machinelivedata.component";
import { ScenarioMachineLiveDataRoutingModule } from "./scenario-machinelivedata-routing.module";
import { MachineLiveDataService } from "./scenario-machinelivedata.service";
import { LiveDataUpdateDirective } from "./scenario-machinelivedata-differ.directive";

@NgModule({
    declarations: [ScenarioMachineLiveDataComponent, LiveDataUpdateDirective],
    imports: [CommonModule, ScenarioMachineLiveDataRoutingModule, SharedModule],
    providers: [MachineLiveDataService]
})
export class ScenarioMachineLiveDataModule {}
