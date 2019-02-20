import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScenarioNavigationComponent } from './scenario-navigation/scenario-navigation.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        ScenarioNavigationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
