import { TestBed } from '@angular/core/testing';

import { ScenarioUserdataService } from './scenario-userdata.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ScenarioUserdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ScenarioUserdataService]
  }));

  it('should be created', () => {
    const service: ScenarioUserdataService = TestBed.get(ScenarioUserdataService);
    expect(service).toBeTruthy();
  });
});
