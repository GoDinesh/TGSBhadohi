import { Component, Input, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appurl } from 'src/app/constants/common/appurl';
import { Registration } from 'src/app/model/student/registration.model';

@Component({
  selector: 'app-student-details-modal',
  templateUrl: './student-details-modal.component.html',
  styleUrls: ['./student-details-modal.component.css']
})

export class StudentDetailsModalComponent {
  @Input() selectedYear: string;

  constructor(private dialogRef: MatDialogRef<StudentDetailsModalComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  viewDetails(registration: Registration){
    this.dialogRef.close();
    this.router.navigateByUrl('/navmenu' + appurl.menuurl_student + appurl.student_details, { state: { studetails: registration } });  
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}
