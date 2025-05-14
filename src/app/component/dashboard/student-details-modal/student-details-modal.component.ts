import { Component, Input, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appurl } from 'src/app/constants/common/appurl';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';

@Component({
  selector: 'app-student-details-modal',
  templateUrl: './student-details-modal.component.html',
  styleUrls: ['./student-details-modal.component.css']
})

export class StudentDetailsModalComponent {
  @Input() selectedYear: string;

  constructor(private dialogRef: MatDialogRef<StudentDetailsModalComponent>,
    private router: Router, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
  }

  // viewDetails(registration: Registration){
  //   this.dialogRef.close();
  //   this.router.navigateByUrl('/navmenu' + appurl.menuurl_student + appurl.student_details, { state: { studetails: registration } });  
  // }
  viewDetails(registration: Registration){
    //this.router.navigateByUrl(appurl.navmenu + appurl.menuurl_student + appurl.student_details, { state: { studetails: registration } });  
    const url = appurl.navmenu + appurl.menuurl_student + appurl.student_details;
    const encryptData = this.authService.getEncryptText(JSON.stringify(registration));
    this.router.navigate([url,JSON.stringify(encryptData)] );
    // this.router.navigate([url], {
    //   state: {data: JSON.stringify(encryptData)}
    // });
    this.dialogRef.close();
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}
