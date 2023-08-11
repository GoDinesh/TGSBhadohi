import { TestBed } from '@angular/core/testing';

import { FeesTypeService } from './fees-type.service';

describe('FeesTypeService', () => {
  let service: FeesTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
