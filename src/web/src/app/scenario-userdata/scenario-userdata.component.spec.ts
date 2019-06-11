import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioUserDataComponent } from './scenario-userdata.component';
import { ScenarioUserDataService } from './scenario-userdata.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScenarioUserDataComponent', () => {
  let component: ScenarioUserDataComponent;
  let fixture: ComponentFixture<ScenarioUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
      providers:[ ScenarioUserDataService],
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
