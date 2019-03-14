import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ScenarioMachineoverviewComponent } from "./scenario-machineoverview.component";
import { SharedModule } from "../shared/shared.module";

describe("ScenarioMachineoverviewComponent", () => {
  let component: ScenarioMachineoverviewComponent;
  let fixture: ComponentFixture<ScenarioMachineoverviewComponent>;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
      declarations: [ScenarioMachineoverviewComponent],
      imports: [SharedModule, HttpClientTestingModule]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioMachineoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
