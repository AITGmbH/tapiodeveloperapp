import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { ScenarioComponent } from "./components/scenario/scenario.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SelectMachineComponent } from "./components/select-machine/select-machine.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { MachineOverviewService } from "./services/machine-overview.service";
import { HistoricalDataService } from '../scenario-historicaldata/scenario-historicaldata.service';
import { ScenarioNavigationService } from "./services/scenario-navigation.service";
import { DateRangeComponent } from "./components/date-range/date-range.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

library.add(faGithub);

/**
 * Provides access to shared functionality.
 */
@NgModule({
    declarations: [ScenarioComponent, SelectMachineComponent, DateRangeComponent],
    imports: [CommonModule, FontAwesomeModule, NgxDatatableModule, NgSelectModule, FormsModule, OwlDateTimeModule, OwlNativeDateTimeModule],
    exports: [ScenarioComponent, FontAwesomeModule, NgxDatatableModule, SelectMachineComponent, NgSelectModule, FormsModule, DateRangeComponent],
    providers: [HistoricalDataService, MachineOverviewService, ScenarioNavigationService]
})
export class SharedModule {
    faGitHub = faGithub;
}
