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
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import { DataTablesModule } from 'angular-datatables';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
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
    FormsModule
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
    // MatNativeDateModule,
    MatAutocompleteModule,
    MatToolbarModule,
    FormsModule
  ],
  providers: [],
})
export class SharedModule {
 
}