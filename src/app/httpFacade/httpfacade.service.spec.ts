import { TestBed } from '@angular/core/testing';

import { HttpfacadeService } from './httpfacade.service';

describe('HttpfacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpfacadeService = TestBed.get(HttpfacadeService);
    expect(service).toBeTruthy();
  });
});
