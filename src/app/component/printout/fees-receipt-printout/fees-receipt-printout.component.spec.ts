import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesReceiptPrintoutComponent } from './fees-receipt-printout.component';

describe('FeesReceiptPrintoutComponent', () => {
  let component: FeesReceiptPrintoutComponent;
  let fixture: ComponentFixture<FeesReceiptPrintoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesReceiptPrintoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesReceiptPrintoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
