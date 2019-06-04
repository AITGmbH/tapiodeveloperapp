import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ScenarioMachinestateComponent } from "./scenario-machinestate.component";
import { MachineStateService } from "./scenario-machinestate-service";
import { of } from "rxjs";
import { SharedModule } from "../shared/shared.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ScenarioMachinestateDetailComponent } from "./detail/detail.component";
import { Router, ActivatedRoute } from "@angular/router";

const routerStub = {
    navigate(value: any) {
        return Promise.resolve(() => true);
    }
};

const activatedRouteStub = {
    params: of({
        tmid: "ABC"
    }),
    snapshot: {
        params: {
            tmid: "ABC"
        }
    }
};

describe("ScenarioMachinestateComponent", () => {
    let component: ScenarioMachinestateComponent;
    let fixture: ComponentFixture<ScenarioMachinestateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, HttpClientTestingModule],
            declarations: [ScenarioMachinestateComponent, ScenarioMachinestateDetailComponent],

            providers: [
                MachineStateService,
                { provide: Router, useValue: routerStub },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScenarioMachinestateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
