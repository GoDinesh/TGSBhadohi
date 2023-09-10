import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { breadcrumb } from 'src/app/constants/common/breadcrumb';
import { pageTitle } from 'src/app/constants/common/page-title';
import { ROLE_ADMIN, ROLE_ADMIN_USER } from 'src/app/constants/common/roles';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { FeesTypeComponent } from './fees-type/fees-type.component';
import { DiscountReasonComponent } from './discount-reason/discount-reason.component';
import { FeesStructureComponent } from './fees-structure/fees-structure.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { PermissionGroupComponent } from './permission-group/permission-group.component';
import { AssignPermissionToGroupComponent } from './assign-permission-to-group/assign-permission-to-group.component';

const routes: Routes = [
    {
      path: '',
      children:[
          {
                path: 'class',
                component: ClassComponent,
                canActivate: [AuthGuard],
                data: {
                      breadcrumb: breadcrumb.CLASS,
                      title: pageTitle.CLASS,
                      role: Object.values(ROLE_ADMIN)
                }
          },
          {
                path: 'academic-year',
                component: AcademicYearComponent,
                canActivate: [AuthGuard],
                data: {
                      breadcrumb: breadcrumb.ACADEMIC_YEAR,
                      title: pageTitle.ACADEMIC_YEAR,
                      role: Object.values(ROLE_ADMIN)
                }
          },
          {
                path: 'fees-type',
                component: FeesTypeComponent,
                canActivate: [AuthGuard],
                data: {
                      breadcrumb: breadcrumb.FEES_TYPE,
                      title: pageTitle.FEES_TYPE,
                      role: Object.values(ROLE_ADMIN)
                }
          },
          {
                path: 'discount-reason',
                component: DiscountReasonComponent,
                canActivate: [AuthGuard],
                data: {
                      breadcrumb: breadcrumb.DISCOUNT_REASON,
                      title: pageTitle.DISCOUNT_REASON,
                      role: Object.values(ROLE_ADMIN)
                }
          },
          {
                path: 'fees-structure',
                component: FeesStructureComponent,
                canActivate: [AuthGuard],
                data: {
                      breadcrumb: breadcrumb.FEES_STRUCTURE,
                      title: pageTitle.FEES_STRUCTURE,
                      role: Object.values(ROLE_ADMIN)
                }
          },
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
export class MasterRoutingModule { }
