import { TestBed } from '@angular/core/testing';

import { PatchsService } from './patchs.service';

describe('PatchsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatchsService = TestBed.get(PatchsService);
    expect(service).toBeTruthy();
  });
});
