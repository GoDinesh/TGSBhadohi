import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesReceiptComponent } from './fees-receipt.component';

describe('FeesReceiptComponent', () => {
  let component: FeesReceiptComponent;
  let fixture: ComponentFixture<FeesReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
