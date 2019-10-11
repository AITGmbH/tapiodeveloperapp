import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { AppComponent } from "./app.component";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";
import { SharedModule } from "./shared/shared.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { APP_BASE_HREF } from "@angular/common";
import { Observable } from "rxjs";

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

class MockRouterScrollToTop {
    public navigationEndTop = new NavigationEnd(0, "", "");
    public navigationEndScrolled = new NavigationEnd(20, "", "");
    public navigationStart = new NavigationStart(0, "");
    public events = new Observable(observer => {
        observer.next(this.navigationEndTop);
        observer.next(this.navigationEndScrolled);
        observer.next(this.navigationStart);
        observer.complete();
    });
}

describe("AppComponent", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
            declarations: [
                AppComponent,
                MockModuleNavigationComponent,
                MockExternalLinksDropdownComponent,
                MockNavigationComponent,
                MockScenarioComponent
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: "/" }, { provide: Router, useClass: MockRouterScrollToTop }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it("should create the app", () => {
        expect(component).toBeTruthy();
    });

    it(`should have 'developerapp' as title`, () => {
        expect(component.title).toEqual("developerapp");
    });

    it(`should open the ait website in a new tab`, () => {
        const anchorTapio = fixture.debugElement.query(By.css("a[href='https://aitgmbh.de/']"));
        const realAnchor = anchorTapio.nativeElement as HTMLAnchorElement;
        expect(realAnchor.target).toBe("_blank");
    });

    it(`should open the ait website with relation noopener`, () => {
        const anchorTapio = fixture.debugElement.query(By.css("a[href='https://aitgmbh.de/']"));
        const realAnchor = anchorTapio.nativeElement as HTMLAnchorElement;
        expect(realAnchor.rel).toBe("noopener noreferrer");
    });

    it("should call append event handlers on create", async done => {
        const createHandlerOnBurgerSpy = spyOn<any>(component, "createNavbarBurgerToggle").and.callThrough();
        fixture.detectChanges();
        expect(createHandlerOnBurgerSpy).toHaveBeenCalled();
        done();
    });

    it("should do something on window scroll", () => {
        const onScrollSpy = spyOn(component, "onScroll").and.callThrough();
        window.dispatchEvent(new Event("scroll"));
        expect(onScrollSpy).toHaveBeenCalled();
    });
});
