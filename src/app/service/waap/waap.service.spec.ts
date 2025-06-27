import { TestBed } from '@angular/core/testing';

import { WaapService } from './waap.service';

describe('WaapService', () => {
  let service: WaapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
