import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { MachineCommandArgumentsComponent } from "./machine-command-arguments.component";
import { MachineCommandArgument, CommandValueType } from "../../scenario-machinecommands.service";
import { FormsModule } from "@angular/forms";

const commandArgumentsMock = {
    value: {
        value: 42,
        valueType: "Float"
    }
};

const commandArgumentChangedMock = {
    value: {
        value: 24,
        valueType: "Float"
    }
};

const machineArgumentMock = new MachineCommandArgument("value", CommandValueType.Float, 24);

// const commandResponseMock = Object.assign(new CommandResponse(), {
//     CloudConnectorId: "123",
//     Response: {},
//     Status: CommandResponseStatus.Successfull,
//     StatusDescrption: "abc"
// } as CommandResponse);

describe("MachineCommandArgumentsComponent", () => {
    let component: MachineCommandArgumentsComponent;
    let fixture: ComponentFixture<MachineCommandArgumentsComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MachineCommandArgumentsComponent],
            providers: [],
            imports: [HttpClientTestingModule, FormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MachineCommandArgumentsComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it("should create machine command argument component", () => {
        expect(component).toBeTruthy();
    });

    it("should load argument successfully", () => {
        fixture.autoDetectChanges(true);
        const handleArgumentsSpy = spyOn(component, "handleArguments").and.callThrough();

        component.setMachineCommandArguments = commandArgumentsMock;

        expect(handleArgumentsSpy).toHaveBeenCalledWith(commandArgumentsMock);
        expect(component.args.length).toBe(1);
    });

    it("should load non arguments", () => {
        fixture.autoDetectChanges(true);
        const handleArgumentsSpy = spyOn(component, "handleArguments").and.callThrough();

        component.setMachineCommandArguments = null;

        expect(handleArgumentsSpy).toHaveBeenCalledWith(null);
        expect(component.args.length).toBe(0);
    });

    it("should trigger value change successfully", () => {
        fixture.autoDetectChanges(true);
        const handleArgumentsSpy = spyOn(component, "handleArguments").and.callThrough();
        const argumentChangeEmitSpy = spyOn(component.argumentsChange, "emit").and.callThrough();

        component.setMachineCommandArguments = commandArgumentsMock;

        expect(handleArgumentsSpy).toHaveBeenCalledWith(commandArgumentsMock);
        expect(component.args.length).toBe(1);

        component.valueChange(machineArgumentMock);

        const arg = component.args.find(el => el.name === machineArgumentMock.name);
        expect(arg.value).toBe(machineArgumentMock.value);
        console.log(argumentChangeEmitSpy.arguments);

        expect(argumentChangeEmitSpy).toHaveBeenCalledWith(commandArgumentChangedMock);
    });
});
