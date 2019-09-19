import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { of } from "rxjs/internal/observable/of";
import { MachineCommandContainerComponent } from "./machine-command-container.component";
import {
    MachineCommandsService,
    CommandItem,
    commandType,
    CommandResponse,
    CommandResponseStatus
} from "../scenario-machinecommands.service";
import { MachineCommandArgumentsComponent } from "./machine-command-arguments/machine-command-arguments.component";
import { SharedModule } from "../../shared/shared.module";
import { tap } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";

const commandItemMock = Object.assign(new CommandItem(), {
    id: "123",
    tmid: "1234",
    inArguments: null,
    serverId: "12345",
    commandType: commandType.read
} as CommandItem);

const commandResponseMock = Object.assign(new CommandResponse(), {
    CloudConnectorId: "123",
    Response: {},
    Status: CommandResponseStatus.Successfull,
    StatusDescrption: "abc"
} as CommandResponse);

describe("MachineCommandContainerComponent", () => {
    let component: MachineCommandContainerComponent;
    let fixture: ComponentFixture<MachineCommandContainerComponent>;
    let machineCommandsService: MachineCommandsService;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MachineCommandContainerComponent, MachineCommandArgumentsComponent],
            providers: [MachineCommandsService],
            imports: [SharedModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MachineCommandContainerComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        machineCommandsService = element.injector.get(MachineCommandsService);
        component.command = commandItemMock;
    });

    it("should create machine command container component", () => {
        expect(component).toBeTruthy();
    });

    it("should execute command successfully", done => {
        fixture.autoDetectChanges(true);
        const executeCommandAsyncSpy = spyOn(machineCommandsService, "executeCommandAsync").and.returnValue(
            of(commandResponseMock)
        );
        const componentLoadingNextSpy = spyOn(component.loading$, "next").and.callThrough();

        component.executeCommand();

        expect(executeCommandAsyncSpy).toHaveBeenCalled();

        component.commandResponse$.subscribe(response => {
            expect(response).toEqual(commandResponseMock);
            expect(componentLoadingNextSpy).toHaveBeenCalledTimes(2);
            done();
        });
    });

    it("should execute command with error", done => {
        fixture.autoDetectChanges(true);
        const error = new Error("test");
        const executeCommandAsyncSpy = spyOn(machineCommandsService, "executeCommandAsync").and.returnValue(
            throwError(error)
        );
        const componentLoadingNextSpy = spyOn(component.loading$, "next").and.callThrough();

        component.executeCommand();

        expect(executeCommandAsyncSpy).toHaveBeenCalled();
        component.commandResponse$.subscribe((response: any) => {
            expect(response).toEqual(error);
            expect(componentLoadingNextSpy).toHaveBeenCalledTimes(2);
            done();
        });
    });
});
