import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { SelectMachineComponent } from './select-machine.component';
import { AvailableMachinesService } from '../../services/available-machines.service';
import { AssignedMachine } from '../../models/assigned-machine.model';
import { NgSelectModule } from '@ng-select/ng-select';

const mockAssignedMachines: AssignedMachine[] = [
            {
                tmid: "c2241cdc59034d11b9fcc9b325e67f79",
                displayName: "Testmachine1"
            },
            {
                tmid: "c2241cdc59034d11b9fcc9b325e67f71",
                displayName: "Testmachine2"
            }
        ];

describe("SelectMachineComponent", () => {
    let component: SelectMachineComponent;
    let fixture: ComponentFixture<SelectMachineComponent>;
    let availableMachinesService: AvailableMachinesService;
    let getMachinesSpy: jasmine.Spy;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectMachineComponent],
            imports: [NgSelectModule, HttpClientTestingModule],
            providers: [AvailableMachinesService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectMachineComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        availableMachinesService = element.injector.get(
            AvailableMachinesService
        );
        getMachinesSpy = spyOn(availableMachinesService, "getMachines").and.returnValue(of(mockAssignedMachines));
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should fetch data and display it", async () => {
        expect(getMachinesSpy).toHaveBeenCalledTimes(1);
        const assignedMachines = await component.assignedMachines$.toPromise();
        expect(assignedMachines.length).toEqual(2);
        
    });
});
