import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBookFeesComponent } from './pending-book-fees.component';

describe('PendingBookFeesComponent', () => {
  let component: PendingBookFeesComponent;
  let fixture: ComponentFixture<PendingBookFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingBookFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingBookFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
