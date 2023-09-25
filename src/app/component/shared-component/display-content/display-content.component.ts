import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-display-content',
  templateUrl: './display-content.component.html',
  styleUrls: ['./display-content.component.css']
})

export class DisplayContentComponent {
  isSideNavCollapsed = true;
  screenWidth !: number;
  loginUserName: string = '';
  
  constructor(private authService: AuthService,
              private registrationService: RegistrationService
    ){
    this.loginUserName = this.authService.getLoginUserName();

    
  }

  async ngOnInit(){
    this.screenWidth = window.innerWidth;
    //this.loadStudentList();
  }

  onToggleSideNav(data: SideNavToggle){
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  // loadStudentList(){
  //   this.registrationService.studentList(new Registration).subscribe(res=>{
  //   });
  // }

}
