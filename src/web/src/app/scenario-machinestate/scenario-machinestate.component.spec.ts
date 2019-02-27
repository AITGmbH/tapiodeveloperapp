import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioMachinestateComponent } from './scenario-machinestate.component';

describe('ScenarioMachinestateComponent', () => {
  let component: ScenarioMachinestateComponent;
  let fixture: ComponentFixture<ScenarioMachinestateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioMachinestateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioMachinestateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
