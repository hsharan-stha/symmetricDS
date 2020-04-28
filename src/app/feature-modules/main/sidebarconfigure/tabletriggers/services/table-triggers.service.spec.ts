import { TestBed } from '@angular/core/testing';

import { TableTriggersService } from './table-triggers.service';

describe('TableTriggersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableTriggersService = TestBed.get(TableTriggersService);
    expect(service).toBeTruthy();
  });
});
