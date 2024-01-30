import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { AboutsComponent } from './abouts/abouts.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedModule } from 'src/app/shared-module';
import { ServicesComponent } from './services/services.component';
import { ExpertInstructorComponent } from './expert-instructor/expert-instructor.component';


@NgModule({
  declarations: [
    HomeComponent,
    ContactsComponent,
    AboutsComponent,
    MainPageComponent,
    ServicesComponent,
    ExpertInstructorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
