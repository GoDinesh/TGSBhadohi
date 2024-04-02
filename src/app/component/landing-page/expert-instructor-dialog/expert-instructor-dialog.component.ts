import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../expert-instructor/expert-instructor.component';

@Component({
  selector: 'app-expert-instructor-dialog',
  templateUrl: './expert-instructor-dialog.component.html',
  styleUrls: ['./expert-instructor-dialog.component.css']
})
export class ExpertInstructorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ExpertInstructorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
