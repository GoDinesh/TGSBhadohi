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
import { MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule} from '@angular/material/radio';
import { DataTablesModule } from 'angular-datatables';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilterDataPipe } from './core/pipes/filter-data.pipe';
import { CdkDrag, CdkDropList ,CdkDropListGroup, DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxPrintModule} from 'ngx-print';
import {MatChipsModule} from '@angular/material/chips';
import { AvatarModule } from 'ngx-avatar';
//import {MatDatepickerModule} from '@angular/material/datepicker';
//import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    FilterDataPipe
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    //MatTableModule,
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
   // MatDatepickerModule,
   // MatNativeDateModule,
    MatAutocompleteModule,
    MatToolbarModule,
    FormsModule,
    DragDropModule,
    MatTreeModule,
    MatCheckboxModule,
    NgxPrintModule,
    MatChipsModule,
    AvatarModule
    
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    //MatTableModule,
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
   // MatDatepickerModule,
    //MatNativeDateModule,
    MatAutocompleteModule,
    MatToolbarModule,
    FormsModule,
    FilterDataPipe,
    DragDropModule,
    MatTreeModule,
    MatCheckboxModule,
    NgxPrintModule,
    MatChipsModule,
    AvatarModule
  
  ],
  providers: [],
})
export class SharedModule {
 
}