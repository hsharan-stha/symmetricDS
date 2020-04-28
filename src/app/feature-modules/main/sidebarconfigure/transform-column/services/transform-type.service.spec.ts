import { TestBed } from '@angular/core/testing';

import { TransformTypeService } from './transform-type.service';

describe('TransformTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransformTypeService = TestBed.get(TransformTypeService);
    expect(service).toBeTruthy();
  });
});
