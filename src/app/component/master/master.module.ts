import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { ClassComponent } from './class/class.component';
import { FeesTypeComponent } from './fees-type/fees-type.component';
import { DiscountReasonComponent } from './discount-reason/discount-reason.component';
import { FeesStructureComponent } from './fees-structure/fees-structure.component';
import { SharedModule } from 'src/app/shared-module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { PermissionGroupComponent } from './permission-group/permission-group.component';
import { AssignPermissionToGroupComponent } from './assign-permission-to-group/assign-permission-to-group.component';


@NgModule({
  declarations: [
    AcademicYearComponent,
    ClassComponent,
    FeesTypeComponent,
    DiscountReasonComponent,
    FeesStructureComponent,
    RegisterUserComponent,
    PermissionGroupComponent,
    AssignPermissionToGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
