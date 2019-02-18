import { TestBed } from '@angular/core/testing';

import { GetsService } from './gets.service';

describe('GetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetsService = TestBed.get(GetsService);
    expect(service).toBeTruthy();
  });
});
