import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { ScenarioComponent } from "./components/scenario/scenario.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

library.add(faGithub);

/**
 * Provides access to shared functionality.
 */
@NgModule({
    declarations: [ScenarioComponent],
    imports: [CommonModule, FontAwesomeModule, NgxDatatableModule],
    exports: [ScenarioComponent, FontAwesomeModule, NgxDatatableModule]
})
export class SharedModule {
    faGitHub = faGithub;
}
