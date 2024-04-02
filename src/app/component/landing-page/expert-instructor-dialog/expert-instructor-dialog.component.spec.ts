import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertInstructorDialogComponent } from './expert-instructor-dialog.component';

describe('ExpertInstructorDialogComponent', () => {
  let component: ExpertInstructorDialogComponent;
  let fixture: ComponentFixture<ExpertInstructorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertInstructorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertInstructorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
