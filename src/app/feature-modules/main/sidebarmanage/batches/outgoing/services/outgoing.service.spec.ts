import { TestBed } from '@angular/core/testing';

import { OutgoingBatchesService } from './outgoing-batches.service';

describe('OutgoingBatchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutgoingBatchesService = TestBed.get(OutgoingBatchesService);
    expect(service).toBeTruthy();
  });
});
