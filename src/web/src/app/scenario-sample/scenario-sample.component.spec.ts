import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ScenarioSampleComponent } from './scenario-sample.component';
import { SharedModule } from '../shared/shared.module';

describe('ScenarioSampleComponent', () => {
  let component: ScenarioSampleComponent;
  let fixture: ComponentFixture<ScenarioSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioSampleComponent ],
      imports: [ SharedModule, HttpClientTestingModule ]
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
