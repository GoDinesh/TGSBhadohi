import { Component, Input, SimpleChanges } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { Registration } from 'src/app/model/student/registration.model';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent {
  @Input() studentData: Registration[] = [];
  @Input() academicYear: string;
  baseurl = appurl.baseurl;

  constructor(){

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.studentData && changes.studentData.currentValue) {
      console.log('Received student data:', changes.studentData.currentValue);
    }
  }
}
