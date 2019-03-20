import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ScenarioHistoricaldataComponent } from "./scenario-historicaldata.component";
import { SharedModule } from "../shared/shared.module";
import { HistoricalDataService } from "./scenario-historicaldata.service";

describe("ScenarioHistoricaldataComponent", () => {
    let component: ScenarioHistoricaldataComponent;
    let fixture: ComponentFixture<ScenarioHistoricaldataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScenarioHistoricaldataComponent],
            imports: [SharedModule, HttpClientTestingModule],
            providers: [HistoricalDataService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScenarioHistoricaldataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
