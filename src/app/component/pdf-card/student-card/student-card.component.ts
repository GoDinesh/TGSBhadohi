import { Component } from '@angular/core';
import { msgTypes } from 'src/app/constants/common/msgType';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent {
schoolName = msgTypes.TIME_GLOBAL_SCHOOL;
}
