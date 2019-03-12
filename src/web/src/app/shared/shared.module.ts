import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { ScenarioComponent } from './components/scenario/scenario.component';
import { LoadingComponent } from './components/loading/loading.component';

library.add(faGithub);

/**
 * Provides access to shared functionality.
 */
@NgModule({
    declarations: [
        ScenarioComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        ScenarioComponent,
        LoadingComponent,
        FontAwesomeModule,
        CommonModule
    ]
})
export class SharedModule {
    faGitHub = faGithub;
}
