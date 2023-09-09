import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { breadcrumb } from 'src/app/constants/common/breadcrumb';
import { pageTitle } from 'src/app/constants/common/page-title';
import { ROLE_ADMIN } from 'src/app/constants/common/roles';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {
    path: '',
    children:[
        {
              path: 'registration',
              component: RegistrationComponent,
              canActivate: [AuthGuard],
              data: {
                    breadcrumb: breadcrumb.REGISTRATION,
                    title: pageTitle.REGISTRATION,
                    role: Object.values(ROLE_ADMIN)
              }
        },
        {
              path: 'studentList',
              component: StudentListComponent,
              canActivate: [AuthGuard],
              data: {
                    breadcrumb: breadcrumb.STUDENT_LIST,
                    title: pageTitle.STUDENT_LIST,
                    role: Object.values(ROLE_ADMIN)
              }
        },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
