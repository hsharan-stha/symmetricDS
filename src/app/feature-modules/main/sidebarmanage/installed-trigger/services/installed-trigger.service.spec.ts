import { TestBed } from '@angular/core/testing';

import { InstalledTriggerService } from './installed-trigger.service';

describe('InstalledTriggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstalledTriggerService = TestBed.get(InstalledTriggerService);
    expect(service).toBeTruthy();
  });
});
