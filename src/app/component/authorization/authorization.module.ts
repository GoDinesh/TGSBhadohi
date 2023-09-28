import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { SharedModule } from 'src/app/shared-module';
import { AssignPermissionToGroupComponent } from './assign-permission-to-group/assign-permission-to-group.component';
import { PermissionGroupComponent } from './permission-group/permission-group.component';
import { RegisterUserComponent } from './register-user/register-user.component';


@NgModule({
  declarations: [
    RegisterUserComponent,
    PermissionGroupComponent,
    AssignPermissionToGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthorizationRoutingModule
  ]
})
export class AuthorizationModule { }
