import { TestBed } from '@angular/core/testing';

import { TableRoutingService } from './table-routing.service';

describe('TableRoutingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableRoutingService = TestBed.get(TableRoutingService);
    expect(service).toBeTruthy();
  });
});
