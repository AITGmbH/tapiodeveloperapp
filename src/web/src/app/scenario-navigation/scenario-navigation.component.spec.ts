import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ScenarioNavigationComponent } from "./scenario-navigation.component";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { ScenarioEntry } from "../shared/models/scenario-entity.model";
import { ScenarioNavigationService } from "./scenario-navigation.service";
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement, Component, Directive } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { NavigationService } from "../shared/services/navigation.service";

declare const viewport;
const scenarioServiceStub = {
    getEntries() {
        return of([
            { caption: "one", url: "/one1" } as ScenarioEntry,
            { caption: "two", url: "/two2" } as ScenarioEntry
        ]);
    }
};

export function MockDirective(options: Component): Directive {
    const metadata: Directive = {
        selector: options.selector,
        inputs: options.inputs,
        outputs: options.outputs
    };
    return Directive(metadata)(class _ {}) as any;
}

describe("ScenarioNavigationComponent", () => {
    let component: ScenarioNavigationComponent;
    let fixture: ComponentFixture<ScenarioNavigationComponent>;
    let debugElement: DebugElement;
    let navigationService: NavigationService;

    beforeEach(async () => {
        viewport.set("desktop-hd");
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [
                ScenarioNavigationComponent,
                MockDirective({
                    selector: "app-select-machine",
                    inputs: ["initialMachineId"],
                    outputs: ["change"]
                }),
                MockDirective({
                    selector: "app-scenario-machinestate"
                }),
                MockDirective({
                    selector: "app-scenario-machinestate-detail"
                })
            ],
            providers: [
                NavigationService,
                { provide: APP_BASE_HREF, useValue: "/" },
                { provide: ScenarioNavigationService, useValue: scenarioServiceStub }
            ]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(ScenarioNavigationComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        navigationService = debugElement.injector.get(NavigationService);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should create two entries", () => {
        const listElements = debugElement.queryAll(By.css("ul > li > a"));

        const firstAnchorElement = listElements[0].nativeElement as HTMLAnchorElement;
        expect(firstAnchorElement.innerText).toBe("ONE");
        expect(listElements[0].properties.href).toBe("/one1");
        const secondAnchorElement = listElements[1].nativeElement as HTMLAnchorElement;
        expect(secondAnchorElement.innerText).toBe("TWO");
        expect(listElements[1].properties.href).toBe("/two2");
    });

    it("should execute select entry and call through service", () => {
        const navigationServiceToggleMenuSpy = spyOn(navigationService, "toggleMenu");
        component.selectEntry();
        expect(navigationServiceToggleMenuSpy).toHaveBeenCalled();
    });
});
