import { Component, Input, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-details-modal',
  templateUrl: './student-details-modal.component.html',
  styleUrls: ['./student-details-modal.component.css']
})

export class StudentDetailsModalComponent {
  @Input() selectedYear: string;

  constructor(private dialogRef: MatDialogRef<StudentDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
