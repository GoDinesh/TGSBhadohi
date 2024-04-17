import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { DataTablesModule } from 'angular-datatables';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilterDataPipe } from './core/pipes/filter-data.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxPrintModule } from 'ngx-print';
import { MatChipsModule } from '@angular/material/chips';
import { FilterStudentListPipe } from './core/pipes/filter-student-list.pipe';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { DateFormatPipePipe } from './core/pipes/date-format-pipe.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ClearFieldsDirective } from './core/directives/clear-fields.directive';
import { FeesReceiptPrintoutComponent } from './component/printout/fees-receipt-printout/fees-receipt-printout.component';
import { LoaderComponent } from './component/shared-component/loader/loader.component';
//import { IvyCarouselModule } from 'angular-responsive-carousel';
//import { CarouselModule } from 'ngx-owl-carousel-o';
//used to set the date format of material date picker
//End
// Pass the FusionCharts library and chart module
FusionChartsModule.fcRoot(FusionCharts, Charts);

@NgModule({
  declarations: [
    FilterDataPipe,
    FilterStudentListPipe,
    DateFormatPipePipe,
    ClearFieldsDirective
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    //MatTabsModule,
    MatListModule,
    MatSelectModule,
    DataTablesModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatToolbarModule,
    FormsModule,
    DragDropModule,
    MatTreeModule,
    MatCheckboxModule,
    NgxPrintModule,
    MatChipsModule,
    FusionChartsModule,
    HighchartsChartModule,
    MatDialogModule,
    MatCardModule,
   //IvyCarouselModule
   CarouselModule,
   FeesReceiptPrintoutComponent,
   LoaderComponent

   
   
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatListModule,
    MatSelectModule,
    DataTablesModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatToolbarModule,
    FormsModule,
    DragDropModule,
    MatTreeModule,
    MatCheckboxModule,
    NgxPrintModule,
    MatChipsModule,
    FusionChartsModule,
    HighchartsChartModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,

    FilterDataPipe,
    FilterStudentListPipe,
    DateFormatPipePipe,
    //CarouselModule
    
    //IvyCarouselModule
    CarouselModule,

    ClearFieldsDirective,
    FeesReceiptPrintoutComponent,
    LoaderComponent
    
  ],
  providers: [
  ],
})
export class SharedModule {

}