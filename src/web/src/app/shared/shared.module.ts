import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { FontAwesomeModule, FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { ScenarioComponent } from "./components/scenario/scenario.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SelectMachineComponent } from "./components/select-machine/select-machine.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { HistoricalDataService } from "../scenario-historicaldata/scenario-historicaldata.service";
import { DateRangeComponent } from "./components/date-range/date-range.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "@danielmoncada/angular-datetime-picker";
import { MachineOverviewService } from "../scenario-machineoverview/scenario-machineoverview.service";
import { ScenarioNavigationService } from "../scenario-navigation/scenario-navigation.service";
import { AvailableMachinesService } from "./services/available-machines.service";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NavigationService } from "./services/navigation.service";

/**
 * Provides access to shared functionality.
 */
@NgModule({
    declarations: [ScenarioComponent, SelectMachineComponent, DateRangeComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgxDatatableModule,
        NgxChartsModule,
        NgSelectModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    exports: [
        CommonModule,
        ScenarioComponent,
        FontAwesomeModule,
        NgxDatatableModule,
        NgxChartsModule,
        SelectMachineComponent,
        NgSelectModule,
        FormsModule,
        DateRangeComponent,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    providers: [
        HistoricalDataService,
        MachineOverviewService,
        ScenarioNavigationService,
        DecimalPipe,
        AvailableMachinesService,
        NavigationService
    ]
})
export class SharedModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIcons(faGithub);
    }
    faGitHub = faGithub;
}
