import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { breadcrumb } from './constants/common/breadcrumb';
import { pageTitle } from './constants/common/page-title';
import { LoginComponent } from './component/shared-component/login/login.component';
import { NavMenuComponent } from './component/shared-component/nav-menu/nav-menu.component';
import { DisplayContentComponent } from './component/shared-component/display-content/display-content.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ROLE_ADMIN, ROLE_ADMIN_USER } from './constants/common/roles';
import { UnauthorizedAttemptComponent } from './component/shared-component/unauthorized-attempt/unauthorized-attempt.component';
import { HomeComponent } from './component/static-website/home/home.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'navmenu',
        component: DisplayContentComponent,
        data: {
            breadcrumb: {
                label: '',
                disable: true,
                info: 'home'
            }
        },
        children:[
            {
                path: 'dashboard',
               // canLoad: [AuthGuard],
                loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule),
                data: {
                    breadcrumb: {
                        label: breadcrumb.DASHBOARD,
                        title: pageTitle.DASHBOARD,
                        disable: true
                    },
                    role: Object.values(ROLE_ADMIN)
                },
            },
            {
                path: 'auth',
                canLoad: [AuthGuard],
                loadChildren: () => import('./component/authorization/authorization.module').then(m => m.AuthorizationModule),
                data: {
                    breadcrumb: {
                        label: breadcrumb.AUTHORIZATION,
                        title: pageTitle.AUTHORIZATION,
                        disable: true
                    },
                    role: Object.values(ROLE_ADMIN)
                },
            },
            {
                    path: 'masters',
                    canLoad: [AuthGuard],
                    loadChildren: () => import('./component/master/master.module').then(m => m.MasterModule),
                    data: {
                        breadcrumb: {
                            label: breadcrumb.MASTER,
                            title: pageTitle.MASTER,
                            disable: true
                        },
                        role: Object.values(ROLE_ADMIN)
                    },
            },
            {
                    path: 'student',
                    canLoad: [AuthGuard],
                    loadChildren: ()=> import('./component/student/student.module').then(m=> m.StudentModule),
                    data:{
                        breadcrumb: {
                            label: breadcrumb.STUDENT,
                            title: pageTitle.STUDENT,
                            disable: true
                        },
                        role: Object.values(ROLE_ADMIN)
                    }
            },
            {
                path: 'fees',
                canLoad: [AuthGuard],
                loadChildren: ()=> import('./component/fees/fees.module').then(m=> m.FeesModule),
                data:{
                    breadcrumb: {
                        label: breadcrumb.FEES,
                        title: pageTitle.FEES,
                        disable: true
                    },
                    role: Object.values(ROLE_ADMIN)
                }
            },
            {
                path: 'reports',
                canLoad: [AuthGuard],
                loadChildren: ()=> import('./component/reports/reports.module').then(m=> m.ReportsModule),
                data:{
                    breadcrumb: {
                        label: breadcrumb.REPORTS,
                        title: pageTitle.REPORTS,
                        disable: true
                    },
                    role: Object.values(ROLE_ADMIN_USER)
                }
            }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'unauthorized-attempt',
        component: UnauthorizedAttemptComponent
    },
    {
        path: '**',
        component: UnauthorizedAttemptComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
