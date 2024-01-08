import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  homeFlag = true;
  aboutFlag = false;
  contactFlag = false;

  showHomePage() {
    this.homeFlag = true;
    this.aboutFlag = false;
    this.contactFlag = false;
  }

  showAboutPage() {
    this.homeFlag = false;
    this.aboutFlag = true;
    this.contactFlag = false;
  }

  showContactPage() {
    this.homeFlag = false;
    this.aboutFlag = false;
    this.contactFlag = true;
  }
}
