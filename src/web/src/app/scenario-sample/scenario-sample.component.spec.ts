import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioSampleComponent } from './scenario-sample.component';

describe('ScenarioSampleComponent', () => {
  let component: ScenarioSampleComponent;
  let fixture: ComponentFixture<ScenarioSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
