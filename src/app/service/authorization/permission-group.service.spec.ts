import { TestBed } from '@angular/core/testing';

import { PermissionGroupService } from './permission-group.service';

describe('PermissionGroupService', () => {
  let service: PermissionGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
