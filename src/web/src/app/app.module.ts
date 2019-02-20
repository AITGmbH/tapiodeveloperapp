import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ScenarioNavigationComponent } from './scenario-navigation/scenario-navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { ScenarioSampleModule } from './scenario-sample/scenario-sample.module';
import { SharedModule } from './shared/shared.module';

library.add(faGithub);

@NgModule({
    declarations: [
        AppComponent,
        ScenarioNavigationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        HttpClientModule,
        ScenarioSampleModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    faGitHub = faGithub;
}
