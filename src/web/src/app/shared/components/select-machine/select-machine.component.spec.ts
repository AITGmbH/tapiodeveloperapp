import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { SelectMachineComponent } from "./select-machine.component";
import { MachineOverviewService } from "src/app/scenario-machineoverview/scenario-machineoverview.service";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { Subscription } from "../../models/subscription.model";
import { DebugElement } from "@angular/core";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

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
    },
    {
        licenses: [
            {
                licenseId: "55555555-0000-0000-0000-000000000001",
                applicationId: "1",
                createdDate: "2019-04-27T14:19:25.2428038+00:00",
                billingStartDate: "2019-04-29T14:19:25.2428038+00:00",
                billingInterval: "P1M",
                licenseCount: 999
            }
        ],
        subscriptionId: "55555555-0000-0000-0000-000000000000",
        name: "subscriptionName",
        tapioId: "tapioId",
        assignedMachines: [
            {
                tmid: "c2241cdc59034d11b9fcc9b325e67f79",
                displayName: "Another testmachine"
            },
            {
                tmid: "c2241cdc59034d11b9fcc9b325e67f71",
                displayName: "The second testmachine"
            }
        ],
        subscriptionTypes: ["Developer", "Customer", "Manufacturer"]
    }
];

const machineDisplayNamePrefix = "↳ ";

describe("SelectMachineComponent", () => {
    let component: SelectMachineComponent;
    let fixture: ComponentFixture<SelectMachineComponent>;
    let machineOverviewService: MachineOverviewService;
    let getSubscriptionsSpy: jasmine.Spy;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectMachineComponent],
            providers: [MachineOverviewService],
            imports: [HttpClientTestingModule, NgSelectModule, FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectMachineComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        machineOverviewService = element.injector.get(MachineOverviewService);
        getSubscriptionsSpy = spyOn(machineOverviewService, "getSubscriptions").and.returnValue(of(mockSubscriptions));
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should fetch data and display it", async () => {
        fixture.detectChanges();
        expect(getSubscriptionsSpy).toHaveBeenCalledTimes(1);
        const items = await component.items$.toPromise();
        expect(items.length).toEqual(6);
        expect(items[0].name).toEqual(mockSubscriptions[0].name);
        expect(items[0].tmid).toBeUndefined();
        expect((items[0] as NgOption).disabled).toBe(true);
        expect(items[1].name).toEqual(
            machineDisplayNamePrefix + mockSubscriptions[0].assignedMachines[0].displayName
        );
        expect(items[1].tmid).not.toBeUndefined();
        expect((items[1] as NgOption).disabled).toBeUndefined();
        expect(component.selectedMachine).toBeUndefined();
    });
    it("should select the initialMachineId", async () => {
        expect(getSubscriptionsSpy).toHaveBeenCalledTimes(0);
        component.initialMachineId = mockSubscriptions[0].assignedMachines[1].tmid;
        fixture.detectChanges();

        expect(getSubscriptionsSpy).toHaveBeenCalledTimes(1);

        expect(component.selectedMachine.tmid).toEqual(mockSubscriptions[0].assignedMachines[1].tmid);
        expect(component.selectedMachine.displayName).toEqual(
            machineDisplayNamePrefix + mockSubscriptions[0].assignedMachines[1].displayName
        );
    });
});
