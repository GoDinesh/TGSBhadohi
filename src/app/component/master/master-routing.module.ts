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
          }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
