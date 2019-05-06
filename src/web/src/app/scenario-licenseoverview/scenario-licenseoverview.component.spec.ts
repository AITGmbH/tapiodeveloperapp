import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LicenseOverviewComponent } from "./scenario-licenseoverview.component";
import { SharedModule } from "../shared/shared.module";
import { LicenseOverviewService } from './scenario-licenseoverview.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe("ScenarioLicenseoverviewComponent", () => {
    let component: LicenseOverviewComponent;
    let fixture: ComponentFixture<LicenseOverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LicenseOverviewComponent],
            providers: [LicenseOverviewService],
            imports: [SharedModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LicenseOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
