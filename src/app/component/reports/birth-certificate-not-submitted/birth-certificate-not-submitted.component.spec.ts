import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthCertificateNotSubmittedComponent } from './birth-certificate-not-submitted.component';

describe('BirthCertificateNotSubmittedComponent', () => {
  let component: BirthCertificateNotSubmittedComponent;
  let fixture: ComponentFixture<BirthCertificateNotSubmittedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BirthCertificateNotSubmittedComponent]
    });
    fixture = TestBed.createComponent(BirthCertificateNotSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
