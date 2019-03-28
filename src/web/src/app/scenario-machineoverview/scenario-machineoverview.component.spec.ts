import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ScenarioMachineoverviewComponent } from "./scenario-machineoverview.component";
import { SharedModule } from "../shared/shared.module";
import { MachineOverviewService } from "./scenario-machineoverview.service";
import { Subscription } from "../shared/models/subscription.model";
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

const mockSubscriptions: Subscription[] = [
    {
        licenses: [
            {
                licenseId: "00000000-0000-0000-0000-000000000000",
                applicationId: "1",
                createdDate: "2019-02-21T14:19:25.2428038+00:00",
                billingStartDate: "2019-03-21T14:19:25.2428038+00:00",
                billingInterval: "P1M",
                licenseCount: 999
            }
        ],
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        name: "name",
        tapioId: "name",
        assignedMachines: [
            {
                tmid: "c2241cdc59034d11b9fcc9b325e67f79",
                displayName: "Testmachine1"
            },
            {
                tmid: "c2241cdc59034d11b9fcc9b325e67f71",
                displayName: "Testmachine2"
            }
        ],
        subscriptionTypes: ["Developer", "Customer", "Manufacturer"]
    } ];

describe("ScenarioMachineoverviewComponent", () => {
    let component: ScenarioMachineoverviewComponent;
    let fixture: ComponentFixture<ScenarioMachineoverviewComponent>;
    let machineOverviewService: MachineOverviewService;
    let getSubscriptionsSpy: jasmine.Spy;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScenarioMachineoverviewComponent],
            imports: [SharedModule, HttpClientTestingModule],
            providers: [MachineOverviewService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScenarioMachineoverviewComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        machineOverviewService = element.injector.get(
            MachineOverviewService
        );
        getSubscriptionsSpy = spyOn(machineOverviewService, "getSubscriptions").and.returnValue(of(mockSubscriptions));
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should fetch data and display it", async () => {
        expect(getSubscriptionsSpy).toHaveBeenCalledTimes(1);
        const subscriptions = await component.subscriptions$.toPromise();
        expect(subscriptions.length).toEqual(1);
        expect(subscriptions[0].assignedMachines.length).toEqual(2);
        
        // 1 subscription
        expect(element.nativeElement.querySelectorAll('.card-header-title').length).toEqual(1);
        // 2 machines
        expect(element.nativeElement.querySelectorAll('.card-content li').length).toEqual(2);
    });
});
