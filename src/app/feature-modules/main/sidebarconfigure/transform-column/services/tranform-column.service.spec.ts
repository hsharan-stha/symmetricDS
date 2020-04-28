import { TestBed } from '@angular/core/testing';

import { TranformColumnService } from './tranform-column.service';

describe('TranformColumnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranformColumnService = TestBed.get(TranformColumnService);
    expect(service).toBeTruthy();
  });
});
