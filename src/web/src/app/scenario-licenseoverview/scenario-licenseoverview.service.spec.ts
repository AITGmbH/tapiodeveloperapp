import { TestBed } from "@angular/core/testing";
import { LicenseOverviewService } from "./scenario-licenseoverview.service";

describe("ScenarioLicenseoverviewService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: LicenseOverviewService = TestBed.get(LicenseOverviewService);
        expect(service).toBeTruthy();
    });
});
