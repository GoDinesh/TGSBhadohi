import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropoutStudentsComponent } from './dropout-students.component';

describe('DropoutStudentsComponent', () => {
  let component: DropoutStudentsComponent;
  let fixture: ComponentFixture<DropoutStudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropoutStudentsComponent]
    });
    fixture = TestBed.createComponent(DropoutStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
