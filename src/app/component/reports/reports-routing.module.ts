import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingFeesComponent } from './pending-fees/pending-fees.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { breadcrumb } from 'src/app/constants/common/breadcrumb';
import { pageTitle } from 'src/app/constants/common/page-title';
import { ROLE_ADMIN_USER } from 'src/app/constants/common/roles';
import { AadharDetailsComponent } from './aadhar-details/aadhar-details.component';
import { FeesCollectionComponent } from './fees-collection/fees-collection.component';

const routes: Routes = [
  {
    path: '',
    children:[
        {
              path: 'pending-fees',
              component: PendingFeesComponent,
              canActivate: [AuthGuard],
              data: {
                    breadcrumb: breadcrumb.PENDING_FEES,
                    title: pageTitle.PENDING_FEES,
                    role: Object.values(ROLE_ADMIN_USER)
              }
        },
        {
              path: 'aadhar-details',
              component: AadharDetailsComponent,
              canActivate: [AuthGuard],
              data: {
                    breadcrumb: breadcrumb.AADHAR_DETAILS,
                    title: pageTitle.AADHAR_DETAILS,
                    role: Object.values(ROLE_ADMIN_USER)
              }
        },
        {
            path: 'fees-collection',
            component: FeesCollectionComponent,
            canActivate: [AuthGuard],
            data: {
                  breadcrumb: breadcrumb.FEES_COLLECTION,
                  title: pageTitle.FEES_COLLECTION,
                  role: Object.values(ROLE_ADMIN_USER)
            }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
