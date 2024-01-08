import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { breadcrumb } from 'src/app/constants/common/breadcrumb';
import { pageTitle } from 'src/app/constants/common/page-title';
import { ROLE_ADMIN_USER } from 'src/app/constants/common/roles';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainPageComponent,
        canActivate: [AuthGuard],
                data: {
                      breadcrumb: breadcrumb.PAY_FEES,
                      title: pageTitle.PAY_FEES,
                      role: Object.values(ROLE_ADMIN_USER)
                }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
