import { TestBed } from "@angular/core/testing";
import { LicenseOverviewService } from "./scenario-licenseoverview.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe("ScenarioLicenseoverviewService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [LicenseOverviewService],
        imports: [HttpClientTestingModule]
    }));

    it("should be created", () => {
        const service: LicenseOverviewService = TestBed.get(LicenseOverviewService);
        expect(service).toBeTruthy();
    });
});
