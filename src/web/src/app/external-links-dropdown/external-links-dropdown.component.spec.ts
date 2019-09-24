import { TestBed, ComponentFixture } from "@angular/core/testing";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement, Component, Directive } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ExternalLinksDropdownComponent } from "./external-links-dropdown.component";
import { NavigationService } from "../shared/services/navigation.service";

describe("ExternalLinksComponent", () => {
    let component: ExternalLinksDropdownComponent;
    let fixture: ComponentFixture<ExternalLinksDropdownComponent>;
    let navigationService: NavigationService;
    let debugElement: DebugElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ExternalLinksDropdownComponent],
            providers: [NavigationService, { provide: APP_BASE_HREF, useValue: "/" }]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(ExternalLinksDropdownComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        navigationService = debugElement.injector.get(NavigationService);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should create three entries", () => {
        const listElements = debugElement.queryAll(By.css(".navbar-dropdown a.navbar-item"));
        expect(listElements.length).toBe(3);
    });

    it("should select first element and call through service", () => {
        const navigationServiceToggleMenuSpy = spyOn(navigationService, "toggleMenu");

        const listElements = debugElement.queryAll(By.css(".navbar-dropdown a.navbar-item"));
        expect(listElements.length).toBeGreaterThan(0);

        const firstElement = listElements[0];
        expect(firstElement).not.toBeNull();

        firstElement.nativeElement.click();
        fixture.detectChanges();

        expect(navigationServiceToggleMenuSpy).toHaveBeenCalled();
    });
});
