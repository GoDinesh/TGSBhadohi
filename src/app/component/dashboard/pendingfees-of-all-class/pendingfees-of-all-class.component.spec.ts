import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingfeesOfAllClassComponent } from './pendingfees-of-all-class.component';

describe('PendingfeesOfAllClassComponent', () => {
  let component: PendingfeesOfAllClassComponent;
  let fixture: ComponentFixture<PendingfeesOfAllClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingfeesOfAllClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingfeesOfAllClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
