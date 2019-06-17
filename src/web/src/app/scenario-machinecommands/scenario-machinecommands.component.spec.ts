import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SharedModule } from "../shared/shared.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { MachineCommandsComponent } from "./scenario-machinecommands.component";
import { MachineCommandsService } from "./scenario-machinecommands.service";

describe("MachineCommandsComponent", () => {
    let component: MachineCommandsComponent;
    let fixture: ComponentFixture<MachineCommandsComponent>;
    let machineCommandsService: MachineCommandsService;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MachineCommandsComponent],
            providers: [MachineCommandsService],
            imports: [SharedModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MachineCommandsComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        machineCommandsService = element.injector.get(MachineCommandsService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
