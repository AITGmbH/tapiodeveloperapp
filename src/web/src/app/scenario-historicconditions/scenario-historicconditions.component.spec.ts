import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioHistoricconditionsComponent } from './scenario-historicconditions.component';

describe('ScenarioHistoricconditionsComponent', () => {
  let component: ScenarioHistoricconditionsComponent;
  let fixture: ComponentFixture<ScenarioHistoricconditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioHistoricconditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioHistoricconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
