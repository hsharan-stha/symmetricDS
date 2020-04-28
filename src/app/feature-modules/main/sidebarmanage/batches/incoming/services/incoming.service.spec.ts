import { TestBed } from '@angular/core/testing';

import { IncomingBatchesService } from './incoming-batches.service';

describe('IncomingBatchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncomingBatchesService = TestBed.get(IncomingBatchesService);
    expect(service).toBeTruthy();
  });
});
