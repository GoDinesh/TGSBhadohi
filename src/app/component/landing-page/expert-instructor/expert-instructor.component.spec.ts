import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertInstructorComponent } from './expert-instructor.component';

describe('ExpertInstructorComponent', () => {
  let component: ExpertInstructorComponent;
  let fixture: ComponentFixture<ExpertInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
