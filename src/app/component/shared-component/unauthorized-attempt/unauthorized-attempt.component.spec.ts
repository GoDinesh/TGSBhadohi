import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedAttemptComponent } from './unauthorized-attempt.component';

describe('UnauthorizedAttemptComponent', () => {
  let component: UnauthorizedAttemptComponent;
  let fixture: ComponentFixture<UnauthorizedAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthorizedAttemptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
