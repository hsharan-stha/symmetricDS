import { TestBed } from '@angular/core/testing';

import { TransformTableService } from './transform-table.service';

describe('TransformTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransformTableService = TestBed.get(TransformTableService);
    expect(service).toBeTruthy();
  });
});
