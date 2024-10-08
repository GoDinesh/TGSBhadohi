import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule} from '@angular/material/divider'
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { NgSimpleSidebarModule } from 'ng-simple-sidebar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared-module';
import { CoreModule } from './core/core.module';
import { ExpandMenuDirective } from './expand-menu.directive';
import { SublevelMenuComponent } from './component/shared-component/sidenav/sublevel-menu.component';
import { SidenavComponent } from './component/shared-component/sidenav/sidenav.component';
import { FooterComponent } from './component/shared-component/footer/footer.component';
import { LoginComponent } from './component/shared-component/login/login.component';
import { NavMenuComponent } from './component/shared-component/nav-menu/nav-menu.component';
import { DisplayContentComponent } from './component/shared-component/display-content/display-content.component';
import { UnauthorizedAttemptComponent } from './component/shared-component/unauthorized-attempt/unauthorized-attempt.component';
import { BreadcrumbComponent } from './component/shared-component/breadcrumb/breadcrumb.component';
import { StudentCardComponent } from './component/pdf-card/student-card/student-card.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { LoaderComponent } from './component/shared-component/loader/loader.component';
import { SendNotificationComponent } from './component/notifications/send-notification/send-notification.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    FooterComponent,
    ExpandMenuDirective,
    SublevelMenuComponent,
    SidenavComponent,

    DisplayContentComponent,
    UnauthorizedAttemptComponent,
    BreadcrumbComponent,
    StudentCardComponent,
    SendNotificationComponent,
   
    
    

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgSimpleSidebarModule,
    FormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    BreadcrumbModule,
    SharedModule,
    CoreModule,
    LoaderComponent,
    
    
  ],
  exports:[
      SharedModule,
      
      
     
  ],
  providers: [
    {
          provide: LocationStrategy,
          useClass: HashLocationStrategy
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    // Auth
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: ApiInterceptor,
  //   multi: true
  // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
