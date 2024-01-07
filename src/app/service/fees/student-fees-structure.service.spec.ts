import { TestBed } from '@angular/core/testing';

import { StudentFeesStructureService } from './student-fees-structure.service';

describe('StudentFeesStructureService', () => {
  let service: StudentFeesStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentFeesStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
