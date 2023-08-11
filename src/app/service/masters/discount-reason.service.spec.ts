import { TestBed } from '@angular/core/testing';

import { DiscountReasonService } from './discount-reason.service';

describe('DiscountReasonService', () => {
  let service: DiscountReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
