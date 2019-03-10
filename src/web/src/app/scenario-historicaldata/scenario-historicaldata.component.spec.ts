import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioHistoricaldataComponent } from './scenario-historicaldata.component';

describe('ScenarioHistoricaldataComponent', () => {
  let component: ScenarioHistoricaldataComponent;
  let fixture: ComponentFixture<ScenarioHistoricaldataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioHistoricaldataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioHistoricaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
