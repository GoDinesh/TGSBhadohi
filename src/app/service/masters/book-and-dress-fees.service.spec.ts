import { TestBed } from '@angular/core/testing';

import { BookAndDressFeesService } from './book-and-dress-fees.service';

describe('BookAndDressFeesService', () => {
  let service: BookAndDressFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAndDressFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
