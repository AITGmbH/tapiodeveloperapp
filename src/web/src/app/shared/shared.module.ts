import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { ScenarioComponent } from "./components/scenario/scenario.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SelectMachineComponent } from "./components/select-machine/select-machine.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { AvailableMachinesService } from "./services/available-machines.service";

library.add(faGithub);

/**
 * Provides access to shared functionality.
 */
@NgModule({
    declarations: [ScenarioComponent, SelectMachineComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgxDatatableModule,
        NgSelectModule
    ],
    exports: [
        ScenarioComponent,
        FontAwesomeModule,
        NgxDatatableModule,
        SelectMachineComponent,
        NgSelectModule
    ],
    providers: [AvailableMachinesService]
})
export class SharedModule {
    faGitHub = faGithub;
}
