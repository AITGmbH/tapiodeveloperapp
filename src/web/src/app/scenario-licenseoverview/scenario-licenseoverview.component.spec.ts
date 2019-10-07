import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LicenseOverviewComponent } from "./scenario-licenseoverview.component";
import { SharedModule } from "../shared/shared.module";
import { LicenseOverviewService } from "./scenario-licenseoverview.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Subscription } from "../shared/models/subscription.model";
import { of, throwError } from "rxjs";
import { DebugElement } from "@angular/core";
import { MachineState } from "../shared/models/assigned-machine.model";

const mockSubscriptions: Subscription[] = [
    {
        licenses: [
            {
                licenseId: "2c1d2e2e-acf5-4368-9af2-2df8a872e5e0",
                applicationId: "8a3f5a22-c95d-41f7-91c3-55d18f9f27b1",
                createdDate: "2019-02-21T14:19:25.2428038+00:00",
                billingStartDate: "2019-04-21T14:19:25.2428038+00:00",
                billingInterval: "P1M",
                licenseCount: 999
            }
        ],
        subscriptionId: "ab778224-6f7e-40d8-85e3-b7fcce90de58",
        name: "AIT GmbH & Co. KG",
        tapioId: "AIT Developer-Subscription 008",
        assignedMachines: [
            {
                tmid: "1db18c675db4486ab8fdd22c2aabddb3",
                displayName: "Hack the Twig 01",
                machineState: MachineState.Offline
            },
            {
                tmid: "2f5b690df6c0406982d49fd9b7a8835b",
                displayName: "Testmaschine 02",
                machineState: MachineState.Running
            },
            {
                tmid: "5ef41d18b3d249d885f6a79d16386986",
                displayName: "testmachine limited 001",
                machineState: MachineState.Offline
            },
            {
                tmid: "c2241cdc59034d11b9fcc9b325e67f79",
                displayName: "testmachine limited 002",
                machineState: MachineState.Offline
            }
        ],
        subscriptionTypes: ["Developer", "Customer", "Manufacturer"]
    },
    {
        licenses: [
            {
                licenseId: "12f0426f-c60e-4daa-a99a-0415cc7852ba",
                applicationId: "8a3f5a22-c95d-41f7-91c3-55d18f9f27b1",
                createdDate: "2019-03-05T14:02:19.3092668+00:00",
                billingStartDate: "2019-05-05T14:02:19.3092668+00:00",
                billingInterval: "P1M",
                licenseCount: 999
            }
        ],
        subscriptionId: "910e26de-bb4a-4eec-861d-422de55b0cca",
        name: "AIT GmbH & Co. KG - Testcustomer",
        tapioId: "Testing-Applications 002",
        assignedMachines: [
            { tmid: "T00000AIT01", displayName: "AIT Bearbeitungszentrum 01", machineState: MachineState.Offline }
        ],
        subscriptionTypes: ["Customer"]
    }
];

describe("LicenseOverviewComponent", () => {
    let component: LicenseOverviewComponent;
    let fixture: ComponentFixture<LicenseOverviewComponent>;
    let licenseOverviewService: LicenseOverviewService;
    let element: DebugElement;

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
        element = fixture.debugElement;
        licenseOverviewService = element.injector.get(LicenseOverviewService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should fetch data and display it", async () => {
        const getSubscriptionsSpy = spyOn(licenseOverviewService, "getSubscriptions").and.returnValue(
            of(mockSubscriptions)
        );
        fixture.detectChanges();
        expect(getSubscriptionsSpy).toHaveBeenCalledTimes(1);
        const subscriptions = await component.subscriptions$.toPromise();
        expect(subscriptions.length).toEqual(2);
        expect(subscriptions[0].licenses.length).toEqual(1);

        // 2 subscriptions
        expect(element.nativeElement.querySelectorAll(".card-header-title").length).toEqual(2);
        // 2 licenses
        expect(element.nativeElement.querySelectorAll(".card-content li").length).toEqual(2);
        // 12 license properties
        expect(element.nativeElement.querySelectorAll(".license-list-table tr").length).toEqual(12);
    });

    it("should show error on api-error", async () => {
        const getSubscriptionsSpy = spyOn(licenseOverviewService, "getSubscriptions").and.returnValue(
            throwError(new Error("test"))
        );
        fixture.detectChanges();
        expect(getSubscriptionsSpy).toHaveBeenCalledTimes(1);

        expect(await component.subscriptions$.toPromise()).toBeNull();
        expect(element.nativeElement.querySelectorAll(".card-header-title").length).toEqual(0);
        expect(element.nativeElement.querySelectorAll(".license-list").length).toEqual(0);
        expect(element.nativeElement.querySelectorAll(".license-list-table tr").length).toEqual(0);
        expect(element.nativeElement.querySelectorAll(".spinner").length).toEqual(0);
        expect(element.nativeElement.querySelectorAll(".errorMessage").length).toEqual(1);
    });
});
