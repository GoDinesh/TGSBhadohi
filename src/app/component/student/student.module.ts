import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from 'src/app/shared-module';
import { RegistrationComponent } from './registration/registration.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ViewStudentDetailsComponent } from './view-student-details/view-student-details.component';
import { StudentCardComponent } from './student-card/student-card.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    StudentListComponent,
    ViewStudentDetailsComponent,
    StudentCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
