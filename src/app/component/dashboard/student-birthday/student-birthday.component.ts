import { Component } from '@angular/core';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Registration } from 'src/app/model/student/registration.model';
import { RegistrationService } from 'src/app/service/student/registration.service';

@Component({
  selector: 'app-student-birthday',
  templateUrl: './student-birthday.component.html',
  styleUrls: ['./student-birthday.component.css']
})
export class StudentBirthdayComponent {

  posts: Registration[] = [];
  constructor(private registrationService: RegistrationService){

  }
  students = [
    { name: 'John', class: '5th', avatar: 'https://via.placeholder.com/50' },
    { name: 'Jane', class: '6th', avatar: 'https://via.placeholder.com/50' },
    // Add more students here
  ];

  ngOnInit() {
    this.getStudentRecord();
  }

  scrollLeft() {
    const track = document.getElementById('slideTrack');
    if (track) {
      track.scrollLeft -= track.offsetWidth;
    }
  }
  
  scrollRight() {
    const track = document.getElementById('slideTrack');
    if (track) {
      track.scrollLeft += track.offsetWidth;
    }
  }
  

  async getStudentRecord() {
    this.registrationService.studentList(new Registration()).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.posts = res.data;
      }
    })
  }
}
