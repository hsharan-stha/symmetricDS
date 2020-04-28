import { TestBed } from '@angular/core/testing';

import { FileTriggersService } from './file-triggers.service';

describe('FileTriggersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileTriggersService = TestBed.get(FileTriggersService);
    expect(service).toBeTruthy();
  });
});
