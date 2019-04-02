import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioHistoricconditionsComponent } from './scenario-historicconditions.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HistoricconditionsService } from './scenario-historicconditions.service';

describe('ScenarioHistoricconditionsComponent', () => {
  let component: ScenarioHistoricconditionsComponent;
  let fixture: ComponentFixture<ScenarioHistoricconditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScenarioHistoricconditionsComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [HistoricconditionsService]
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
