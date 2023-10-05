import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBirthdayComponent } from './student-birthday.component';

describe('StudentBirthdayComponent', () => {
  let component: StudentBirthdayComponent;
  let fixture: ComponentFixture<StudentBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBirthdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
