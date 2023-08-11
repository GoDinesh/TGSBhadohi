import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountReasonComponent } from './discount-reason.component';

describe('DiscountReasonComponent', () => {
  let component: DiscountReasonComponent;
  let fixture: ComponentFixture<DiscountReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
