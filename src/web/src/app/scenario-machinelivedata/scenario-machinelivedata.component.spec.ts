import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "../shared/shared.module";
import { DebugElement, Component, Directive } from "@angular/core";
import { of, Subject } from "rxjs";
import { ScenarioMachineLiveDataComponent } from "./scenario-machinelivedata.component";
import { Message, MachineLiveDataContainer } from "./scenario-machinelivedata.models";
import { MachineLiveDataService } from "./scenario-machinelivedata.service";

const voidPromiseMock = Promise.resolve();
const machineLiveDataContainerMock = Object.assign(new MachineLiveDataContainer(), {
    msgid: "1234",
    msgt: "itd",
    msgts: "2017-06-29T10:39:03.7651013+01:00",
    tmid: "XYZ",
    msg: {
        k: "key",
        s: "source"
    } as Message
});

export function MockDirective(options: Component): Directive {
    const metadata: Directive = {
        selector: options.selector,
        inputs: options.inputs,
        outputs: options.outputs
    };
    return Directive(metadata)(class _ {}) as any;
}

describe("ScenarioMachineLiveDataComponent", () => {
    let component: ScenarioMachineLiveDataComponent;
    let fixture: ComponentFixture<ScenarioMachineLiveDataComponent>;
    let machineLiveDataService: MachineLiveDataService;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ScenarioMachineLiveDataComponent,
                MockDirective({
                    selector: "[live-data-update]",
                    inputs: ["liveDataValue"]
                })
            ],
            imports: [SharedModule, HttpClientTestingModule],
            providers: [MachineLiveDataService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScenarioMachineLiveDataComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        machineLiveDataService = element.injector.get(MachineLiveDataService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should fetch item data and display it", async () => {
        const machineId = "ABC";
        const keyName = "key1";
        const messageType = "itd";
        const dataItemMock = Object.assign(new MachineLiveDataContainer(), machineLiveDataContainerMock);
        dataItemMock.msgt = messageType;
        dataItemMock.tmid = machineId;
        dataItemMock.msg.k = keyName;
        const dataContainerSubject = new Subject<MachineLiveDataContainer>();

        const startConnectionAsyncSpy = spyOn(machineLiveDataService, "startConnectionAsync").and.returnValue(voidPromiseMock);
        const joinGroupAsyncSpy = spyOn(machineLiveDataService, "joinGroupAsync").and.returnValue(voidPromiseMock);
        const addDataListenerSpy = spyOn(machineLiveDataService, "addDataListener").and.callFake(
            () => dataContainerSubject
        );
        const addElementSpy = spyOn<any>(component, "addElement").and.callThrough();

        fixture.detectChanges();

        await component.selectedMachineChanged(machineId);
        dataContainerSubject.next(dataItemMock);
        fixture.detectChanges();

        expect(startConnectionAsyncSpy).toHaveBeenCalled();
        expect(joinGroupAsyncSpy).toHaveBeenCalled();
        expect(joinGroupAsyncSpy).toHaveBeenCalledWith(machineId);
        expect(addDataListenerSpy).toHaveBeenCalled();
        expect(addElementSpy).toHaveBeenCalled();
        expect(component.itemData$.getValue()).toContain(dataItemMock);
        expect(element.nativeElement.querySelectorAll("div.datatable-cell-value")[0].innerText).toEqual(keyName);
    });

    it("should fetch condition data and display it", async () => {
        const machineId = "ABC";
        const keyName = "key1";
        const messageType = "cond";
        const dataItemMock = Object.assign(new MachineLiveDataContainer(), machineLiveDataContainerMock);
        dataItemMock.msgt = messageType;
        dataItemMock.tmid = machineId;
        dataItemMock.msg.k = keyName;
        const dataContainerSubject = new Subject<MachineLiveDataContainer>();

        const startConnectionAsyncSpy = spyOn(machineLiveDataService, "startConnectionAsync").and.returnValue(voidPromiseMock);
        const joinGroupAsyncSpy = spyOn(machineLiveDataService, "joinGroupAsync").and.returnValue(voidPromiseMock);
        const addDataListenerSpy = spyOn(machineLiveDataService, "addDataListener").and.callFake(
            () => dataContainerSubject
        );
        const addElementSpy = spyOn<any>(component, "addElement").and.callThrough();

        fixture.detectChanges();

        await component.selectedMachineChanged(machineId);
        dataContainerSubject.next(dataItemMock);
        fixture.detectChanges();

        expect(startConnectionAsyncSpy).toHaveBeenCalled();
        expect(joinGroupAsyncSpy).toHaveBeenCalled();
        expect(joinGroupAsyncSpy).toHaveBeenCalledWith(machineId);
        expect(addDataListenerSpy).toHaveBeenCalled();
        expect(addElementSpy).toHaveBeenCalled();
        expect(component.conditionData$.getValue()).toContain(dataItemMock);
        expect(element.nativeElement.querySelectorAll("div.datatable-cell-value")[0].innerText).toEqual(keyName);
    });

    it("should change group on machine change", async () => {
        const machineId1 = "ABC";
        const machineId2 = "DEF";

        spyOn(machineLiveDataService, "startConnectionAsync").and.returnValue(voidPromiseMock);
        spyOn(machineLiveDataService, "addDataListener").and.callFake(() => {
            return new Subject<MachineLiveDataContainer>();
        });
        const joinGroupAsyncSpy = spyOn(machineLiveDataService, "joinGroupAsync").and.returnValue(voidPromiseMock);

        await component.selectedMachineChanged(machineId1);
        expect(joinGroupAsyncSpy).toHaveBeenCalledWith(machineId1);

        await component.selectedMachineChanged(machineId2);
        expect(joinGroupAsyncSpy).toHaveBeenCalledTimes(2);
        expect(joinGroupAsyncSpy).toHaveBeenCalledWith(machineId2);
    });

    it("should fetch multiple condition data and display it", async () => {
        const machineId = "ABC";
        const keyName1 = "key1";
        const keyName2 = "key2";
        const messageType = "cond";

        const dataItemMock1 = Object.assign(new MachineLiveDataContainer(), machineLiveDataContainerMock);
        dataItemMock1.msg = { k: keyName1 } as Message;
        dataItemMock1.tmid = machineId;
        dataItemMock1.msgt = messageType;

        const dataItemMock2 = Object.assign(new MachineLiveDataContainer(), machineLiveDataContainerMock);
        dataItemMock2.msg = { k: keyName2 } as Message;
        dataItemMock2.tmid = machineId;
        dataItemMock2.msgt = messageType;

        const dataContainerSubject = new Subject<MachineLiveDataContainer>();

        spyOn(machineLiveDataService, "startConnectionAsync").and.returnValue(voidPromiseMock);
        spyOn(machineLiveDataService, "joinGroupAsync").and.returnValue(voidPromiseMock);
        const addDataListenerSpy = spyOn(machineLiveDataService, "addDataListener").and.callFake(
            () => dataContainerSubject
        );
        const addElementSpy = spyOn<any>(component, "addElement").and.callThrough();

        fixture.detectChanges();

        await component.selectedMachineChanged(machineId);
        dataContainerSubject.next(dataItemMock1);
        fixture.detectChanges();

        expect(addDataListenerSpy).toHaveBeenCalled();
        expect(addElementSpy).toHaveBeenCalled();
        expect(component.conditionData$.getValue()).toContain(dataItemMock1);
        expect(
            Array.from(element.nativeElement.querySelectorAll("div.datatable-cell-value")).some(
                (el: any) => el.innerText === keyName1
            )
        ).toBe(true);
        fixture.detectChanges();

        dataContainerSubject.next(dataItemMock2);
        fixture.detectChanges();

        expect(addElementSpy).toHaveBeenCalled();
        expect(component.conditionData$.getValue()).toContain(dataItemMock2);
        expect(
            Array.from(element.nativeElement.querySelectorAll("div.datatable-cell-value")).some(
                (el: any) => el.innerText === keyName2
            )
        ).toBe(true);
    });

    it("should fetch condition data and refresh value", async () => {
        const machineId = "ABC";
        const keyName = "key1";
        const source1 = "source1";
        const source2 = "source2";
        const messageType = "cond";
        const dataItemMock = Object.assign(new MachineLiveDataContainer(), machineLiveDataContainerMock);
        dataItemMock.msg = { k: keyName, s: source1 } as Message;
        dataItemMock.tmid = machineId;
        dataItemMock.msgt = messageType;

        const dataContainerSubject = new Subject<MachineLiveDataContainer>();

        spyOn(machineLiveDataService, "startConnectionAsync").and.returnValue(voidPromiseMock);
        spyOn(machineLiveDataService, "joinGroupAsync").and.returnValue(voidPromiseMock);
        const addDataListenerSpy = spyOn(machineLiveDataService, "addDataListener").and.callFake(
            () => dataContainerSubject
        );
        const addElementSpy = spyOn<any>(component, "addElement").and.callThrough();
        fixture.detectChanges();

        await component.selectedMachineChanged(machineId);
        dataContainerSubject.next(dataItemMock);
        fixture.detectChanges();

        expect(addDataListenerSpy).toHaveBeenCalled();
        expect(addElementSpy).toHaveBeenCalled();
        expect(component.conditionData$.getValue()).toContain(dataItemMock);

        dataItemMock.msg.s = source2;

        dataContainerSubject.next(dataItemMock);
        fixture.detectChanges();

        expect(addElementSpy).toHaveBeenCalled();
        expect(component.conditionData$.getValue()).toContain(dataItemMock);
    });

    it("should not add condition for wrong machine", async () => {
        const machineId = "ABC";
        const otherMachineId = "DEF";
        const messageType = "cond";
        const dataItemMock = Object.assign(new MachineLiveDataContainer(), machineLiveDataContainerMock);
        dataItemMock.msgt = messageType;
        dataItemMock.tmid = otherMachineId;
        const dataContainerSubject = new Subject<MachineLiveDataContainer>();

        spyOn(machineLiveDataService, "startConnectionAsync").and.returnValue(voidPromiseMock);
        spyOn(machineLiveDataService, "joinGroupAsync").and.returnValue(voidPromiseMock);
        spyOn(machineLiveDataService, "addDataListener").and.callFake(() => dataContainerSubject);
        const addElementSpy = spyOn<any>(component, "addElement").and.callThrough();
        fixture.detectChanges();

        await component.selectedMachineChanged(machineId);
        dataContainerSubject.next(dataItemMock);
        fixture.detectChanges();

        expect(addElementSpy).not.toHaveBeenCalled();
    });
});
