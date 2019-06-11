import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import { SharedModule } from "./shared/shared.module";

@Component({
    selector: "app-module-navigation",
    template: "<ul></ul>"
})
class MockModuleNavigationComponent {}

@Component({
    selector: "app-external-links-dropdown",
    template: "<ul></ul>"
})
class MockExternalLinksDropdownComponent {}

@Component({
    selector: "app-scenario-navigation",
    template: "<ul></ul>"
})
class MockNavigationComponent {}

@Component({
    selector: "app-scenario",
    template: "<ul></ul>"
})
class MockScenarioComponent {}


describe("AppComponent", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            SharedModule
        ],
        declarations: [
            AppComponent,
            MockModuleNavigationComponent,
            MockExternalLinksDropdownComponent,
            MockNavigationComponent,
            MockScenarioComponent
        ],
        }).compileComponents();
    }));

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have 'developerapp' as title`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual("developerapp");
    });

    it(`should open the ait website in a new tab`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const anchorTapio = fixture.debugElement.query(By.css(".is-centered a[href='https://aitgmbh.de/']"));
        const realAnchor = anchorTapio.nativeElement as HTMLAnchorElement;
        expect(realAnchor.target).toBe("_blank");
    });

    it(`should open the ait website with relation noopener`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const anchorTapio = fixture.debugElement.query(By.css(".is-centered a[href='https://aitgmbh.de/']"));
        const realAnchor = anchorTapio.nativeElement as HTMLAnchorElement;
        expect(realAnchor.rel).toBe("noopener");
    });
});
