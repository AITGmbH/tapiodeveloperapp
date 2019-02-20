import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { ScenarioComponent } from './components/scenario/scenario.component';

library.add(faGithub);

@NgModule({
  declarations: [ ScenarioComponent ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
      ScenarioComponent,
      FontAwesomeModule
  ]
})
export class SharedModule {
    faGitHub = faGithub;
}
