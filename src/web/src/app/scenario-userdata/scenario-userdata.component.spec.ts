import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioUserDataComponent } from './scenario-userdata.component';

describe('ScenarioUserDataComponent', () => {
  let component: ScenarioUserDataComponent;
  let fixture: ComponentFixture<ScenarioUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
