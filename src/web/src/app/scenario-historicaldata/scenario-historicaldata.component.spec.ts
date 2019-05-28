import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ScenarioHistoricaldataComponent } from "./scenario-historicaldata.component";
import { SharedModule } from "../shared/shared.module";
import { HistoricalDataService } from "./scenario-historicaldata.service";
import { DebugElement, Component, Directive } from "@angular/core";
import { of, throwError } from "rxjs";
import { SourceKeys } from "./source-keys.model";
import { NgxChartsModule } from "@swimlane/ngx-charts";

const sourceKeysMock: SourceKeys = {
    tmid: "1",
    keys: ["Energy!AirPressure", "Energy!ElectricPower"]
};

export function MockDirective(options: Component): Directive {
    const metadata: Directive = {
        selector: options.selector,
        inputs: options.inputs,
        outputs: options.outputs
    };

    return Directive(metadata)(class _ {}) as any;
}
describe("ScenarioHistoricaldataComponent", () => {
    let component: ScenarioHistoricaldataComponent;
    let fixture: ComponentFixture<ScenarioHistoricaldataComponent>;
    let historicalDataService: HistoricalDataService;
    let element: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ScenarioHistoricaldataComponent,
                MockDirective({
                    selector: "ngx-charts-line-chart",
                    inputs: ["xAxis", "yAxis", "showGridLines", "roundDomains", "autoScale", "results"]
                })
            ],
            imports: [SharedModule, HttpClientTestingModule],
            providers: [HistoricalDataService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScenarioHistoricaldataComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        historicalDataService = element.injector.get(HistoricalDataService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should fetch data and display it", async () => {
        const getSourceKeysSpy = spyOn(historicalDataService, "getSourceKeys").and.returnValue(of(sourceKeysMock));
        fixture.detectChanges();
        expect(getSourceKeysSpy).toHaveBeenCalledTimes(0);
        const machineId = "1";
        component.selectedMachineChanged(machineId);
        fixture.detectChanges();

        expect(getSourceKeysSpy).toHaveBeenCalledTimes(1);
        expect(getSourceKeysSpy).toHaveBeenCalledWith(machineId);

        expect((await component.sourceKeys$.toPromise()).keys.length).toEqual(2);
        expect(element.nativeElement.querySelectorAll(".sourceKeyList li").length).toEqual(2);
    });

    it("should show error on api-error", async () => {
        const getSourceKeysSpy = spyOn(historicalDataService, "getSourceKeys").and.returnValue(
            throwError(new Error("test"))
        );
        fixture.detectChanges();
        expect(getSourceKeysSpy).toHaveBeenCalledTimes(0);
        const machineId = "1";
        component.selectedMachineChanged(machineId);
        fixture.detectChanges();

        expect(getSourceKeysSpy).toHaveBeenCalledTimes(1);
        expect(getSourceKeysSpy).toHaveBeenCalledWith(machineId);

        expect(element.nativeElement.querySelectorAll(".sourceKeyList li").length).toEqual(0);
        expect(element.nativeElement.querySelectorAll(".spinner").length).toEqual(0);
        expect(element.nativeElement.querySelectorAll(".errorMessage").length).toEqual(1);
    });
});
