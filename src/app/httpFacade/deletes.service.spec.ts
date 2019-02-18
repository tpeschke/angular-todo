import { TestBed } from '@angular/core/testing';

import { DeletesService } from './deletes.service';

describe('DeletesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeletesService = TestBed.get(DeletesService);
    expect(service).toBeTruthy();
  });
});
