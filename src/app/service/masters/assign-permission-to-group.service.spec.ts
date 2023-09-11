import { TestBed } from '@angular/core/testing';

import { AssignPermissionToGroupService } from './assign-permission-to-group.service';

describe('AssignPermissionToGroupService', () => {
  let service: AssignPermissionToGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignPermissionToGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
