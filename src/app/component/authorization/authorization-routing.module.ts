import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { breadcrumb } from 'src/app/constants/common/breadcrumb';
import { pageTitle } from 'src/app/constants/common/page-title';
import { ROLE_ADMIN } from 'src/app/constants/common/roles';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AssignPermissionToGroupComponent } from './assign-permission-to-group/assign-permission-to-group.component';
import { PermissionGroupComponent } from './permission-group/permission-group.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  {
    path: '',
    children:[
    {
          path: 'register-user',
          component: RegisterUserComponent,
          canActivate: [AuthGuard],
          data: {
                breadcrumb: breadcrumb.REGISTER_USER,
                title: pageTitle.REGISTER_USER,
                role: Object.values(ROLE_ADMIN)
          }
    },
    {
          path: 'permission-group',
          component: PermissionGroupComponent,
          canActivate: [AuthGuard],
          data: {
                breadcrumb: breadcrumb.PERMISSION_GROUP,
                title: pageTitle.PERMISSION_GROUP,
                role: Object.values(ROLE_ADMIN)
          }
    },
    {
          path: 'assign-permission-to-group',
          component: AssignPermissionToGroupComponent,
          canActivate: [AuthGuard],
          data: {
                breadcrumb: breadcrumb.ASSIGN_PERMISSION_TO_GROUP,
                title: pageTitle.ASSIGN_PERMISSION_TO_GROUP,
                role: Object.values(ROLE_ADMIN)
          }
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
