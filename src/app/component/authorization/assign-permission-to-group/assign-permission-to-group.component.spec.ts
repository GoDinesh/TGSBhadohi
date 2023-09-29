import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPermissionToGroupComponent } from './assign-permission-to-group.component';

describe('AssignPermissionToGroupComponent', () => {
  let component: AssignPermissionToGroupComponent;
  let fixture: ComponentFixture<AssignPermissionToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPermissionToGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignPermissionToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
