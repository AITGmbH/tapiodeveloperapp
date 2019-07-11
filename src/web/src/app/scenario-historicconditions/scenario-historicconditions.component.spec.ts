import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ScenarioHistoricConditionsComponent } from "./scenario-historicconditions.component";
import { SharedModule } from "../shared/shared.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HistoricConditionsService } from "./scenario-historicconditions.service";
import { RouterTestingModule } from "@angular/router/testing";

describe("ScenarioHistoricconditionsComponent", () => {
    let component: ScenarioHistoricConditionsComponent;
    let fixture: ComponentFixture<ScenarioHistoricConditionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScenarioHistoricConditionsComponent],
            imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
            providers: [HistoricConditionsService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScenarioHistoricConditionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
