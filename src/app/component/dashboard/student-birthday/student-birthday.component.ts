import { Component } from '@angular/core';

@Component({
  selector: 'app-student-birthday',
  templateUrl: './student-birthday.component.html',
  styleUrls: ['./student-birthday.component.css']
})
export class StudentBirthdayComponent {
  students = [
    { name: 'John Doe', class: '5th Grade', avatar: 'path/to/avatar1.jpg' },
    { name: 'Jane Doe', class: '6th Grade', avatar: 'path/to/avatar2.jpg' },
    
  ];
}
