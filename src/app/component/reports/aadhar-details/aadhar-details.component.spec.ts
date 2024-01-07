import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharDetailsComponent } from './aadhar-details.component';

describe('AadharDetailsComponent', () => {
  let component: AadharDetailsComponent;
  let fixture: ComponentFixture<AadharDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AadharDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AadharDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
