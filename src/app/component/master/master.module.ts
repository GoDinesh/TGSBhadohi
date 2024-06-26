import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { ClassComponent } from './class/class.component';
import { FeesTypeComponent } from './fees-type/fees-type.component';
import { DiscountReasonComponent } from './discount-reason/discount-reason.component';
import { FeesStructureComponent } from './fees-structure/fees-structure.component';
import { SharedModule } from 'src/app/shared-module';
import { BookDressFeesComponent } from './book-dress-fees/book-dress-fees.component';

@NgModule({
  declarations: [
    AcademicYearComponent,
    ClassComponent,
    FeesTypeComponent,
    DiscountReasonComponent,
    FeesStructureComponent,
    BookDressFeesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
