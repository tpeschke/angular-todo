import { TestBed } from '@angular/core/testing';

import { GoalHTTPService } from './goal-http.service';

describe('GoalHTTPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoalHTTPService = TestBed.get(GoalHTTPService);
    expect(service).toBeTruthy();
  });
});
