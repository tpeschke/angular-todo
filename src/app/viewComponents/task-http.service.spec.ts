import { TestBed } from '@angular/core/testing';

import { TaskHTTPService } from './task-http.service';

describe('TaskHTTPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskHTTPService = TestBed.get(TaskHTTPService);
    expect(service).toBeTruthy();
  });
});
