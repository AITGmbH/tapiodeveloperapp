import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SharedModule } from "../shared/shared.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { MachineCommandsComponent } from "./scenario-machinecommands.component";
import { MachineCommandsService, CommandItem, commandType } from "./scenario-machinecommands.service";
import { of } from "rxjs/internal/observable/of";
import { MachineCommandContainerComponent } from "./machine-command-container/machine-command-container.component";
import { MachineCommandArgumentsComponent } from "./machine-command-container/machine-command-arguments/machine-command-arguments.component";

const availableCommandItemsMock = [
    Object.assign(new CommandItem(), {
        id: "123",
        tmid: "1234",
        inArguments: null,
        serverId: "12345",
        commandType: commandType.read
    } as CommandItem),
    Object.assign(new CommandItem(), {
        id: "123",
        tmid: "1234",
        inArguments: null,
        serverId: "12345",
        commandType: commandType.read
    })
];

describe("MachineCommandsComponent", () => {
    let component: MachineCommandsComponent;
    let fixture: ComponentFixture<MachineCommandsComponent>;
    let machineCommandsService: MachineCommandsService;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MachineCommandsComponent,
                MachineCommandContainerComponent,
                MachineCommandArgumentsComponent
            ],
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

    it("should create machine command component", () => {
        expect(component).toBeTruthy();
    });

    it("should load available machine commands on init", done => {
        const getCommandsAsyncSpy = spyOn(machineCommandsService, "getCommandsAsync").and.returnValue(
            of(availableCommandItemsMock)
        );

        fixture.detectChanges();

        expect(getCommandsAsyncSpy).toHaveBeenCalled();
        component.commands$.subscribe(availableCommands => {
            expect(availableCommands).toEqual(availableCommandItemsMock);
            done();
        });
    });
});
