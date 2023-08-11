import { TestBed } from '@angular/core/testing';

import { ValidationErrorMessageService } from './validation-error-message.service';

describe('ValidationErrorMessageService', () => {
  let service: ValidationErrorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
