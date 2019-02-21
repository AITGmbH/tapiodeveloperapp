import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioMachineoverviewComponent } from './scenario-machineoverview.component';

describe('ScenarioMachineoverviewComponent', () => {
  let component: ScenarioMachineoverviewComponent;
  let fixture: ComponentFixture<ScenarioMachineoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioMachineoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioMachineoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
