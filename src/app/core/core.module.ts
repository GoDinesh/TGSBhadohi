import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptors/httpInterceptorProviders';
// import { ClearFieldsDirective } from './directives/clear-fields.directive';

@NgModule({
  declarations: [
  
    
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    
  ],
  providers:[httpInterceptorProviders]
})
export class CoreModule { }
