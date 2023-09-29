import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';
import { Registration } from 'src/app/model/student/registration.model';

@Component({
  selector: 'app-view-student-details',
  templateUrl: './view-student-details.component.html',
  styleUrls: ['./view-student-details.component.css']
})
export class ViewStudentDetailsComponent {
  reg: Registration = new Registration();
  constructor(private router: Router,
    public activatedRoute: ActivatedRoute,){
   }

   ngOnInit(){
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      if (res.studetails.registrationNo.length > 0) {
        this.reg = res.studetails;
      }
    });
   }

  
}
