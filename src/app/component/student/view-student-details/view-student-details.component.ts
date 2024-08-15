import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';

@Component({
  selector: 'app-view-student-details',
  templateUrl: './view-student-details.component.html',
  styleUrls: ['./view-student-details.component.css']
})
export class ViewStudentDetailsComponent {
  reg: Registration = new Registration();
  constructor(private router: Router,
    public activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    //this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
    this.route.paramMap.subscribe(() => {
      const param = window.history.state;
      if (param != undefined) {
        const txndata = JSON.parse(param.data);
        const decryptedData = this.authService.getDecryptText(txndata);
        const res = JSON.parse(decryptedData);

        this.reg = new Registration();
        if (res.registrationNo.length > 0) {
          this.reg = res;
        }
      }
    })
    // this.route.queryParams.subscribe((params) => {
    //   const txndata = JSON.parse(params.data);
    //   const decryptedData = this.authService.getDecryptText(txndata);
    //   const res = JSON.parse(decryptedData);

    //   this.reg = new Registration();
    //   if (res.registrationNo.length > 0) {
    //     this.reg = res;
    //   }
    // });
  }


  editRecord(reg: Registration) {
    const url = appurl.navmenu + appurl.menuurl_student + appurl.student_registration;
    const encryptData = this.authService.getEncryptText(JSON.stringify(reg));
    this.router.navigate([url], {
      state: {data: JSON.stringify(encryptData)}
      // queryParams: {
      //   data: JSON.stringify(encryptData)
      // }
    });
  }

}
