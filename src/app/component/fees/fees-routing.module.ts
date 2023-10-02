import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayFeesComponent } from './pay-fees/pay-fees.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { breadcrumb } from 'src/app/constants/common/breadcrumb';
import { pageTitle } from 'src/app/constants/common/page-title';
import { ROLE_ADMIN } from 'src/app/constants/common/roles';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pay-fees',
        component: PayFeesComponent,
        canActivate: [AuthGuard],
                data: {
                      breadcrumb: breadcrumb.PAY_FEES,
                      title: pageTitle.PAY_FEES,
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
export class FeesRoutingModule { }
