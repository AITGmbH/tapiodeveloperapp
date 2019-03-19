import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScenarioNavigationComponent } from "./scenario-navigation/scenario-navigation.component";
import { SharedModule } from "./shared/shared.module";
import { HamburgermenuComponent } from "./hamburgermenu/hamburgermenu.component";

@NgModule({
    declarations: [
        AppComponent,
        ScenarioNavigationComponent,
        HamburgermenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
