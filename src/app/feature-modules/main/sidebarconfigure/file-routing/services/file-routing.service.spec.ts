import { TestBed } from '@angular/core/testing';

import { FileRoutingService } from './file-routing.service';

describe('FileRoutingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileRoutingService = TestBed.get(FileRoutingService);
    expect(service).toBeTruthy();
  });
});
