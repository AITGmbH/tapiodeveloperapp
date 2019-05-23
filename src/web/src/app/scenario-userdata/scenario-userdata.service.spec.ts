import { TestBed } from '@angular/core/testing';

import { ScenarioUserdataService } from './scenario-userdata.service';

describe('ScenarioUserdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScenarioUserdataService = TestBed.get(ScenarioUserdataService);
    expect(service).toBeTruthy();
  });
});
