import { TestBed } from '@angular/core/testing';

import { FeesStructureService } from './fees-structure.service';

describe('FeesStructureService', () => {
  let service: FeesStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
