import { TestBed } from '@angular/core/testing';

import { ScenarioUserDataService } from './scenario-userdata.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ScenarioUserdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ScenarioUserDataService]
  }));

  it('should be created', () => {
    const service: ScenarioUserDataService = TestBed.get(ScenarioUserDataService);
    expect(service).toBeTruthy();
  });
});
