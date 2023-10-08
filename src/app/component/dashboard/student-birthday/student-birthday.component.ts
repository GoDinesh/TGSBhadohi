import { Component, ElementRef, ViewChild } from '@angular/core';
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
  todayBirthdayStudents: Registration[] = [];
  constructor(private registrationService: RegistrationService){

  }

  ngOnInit() {
    this.getStudentRecord();
  }

  displayModal: string = 'none';
  @ViewChild('modalContent') modalContent: ElementRef;

  openModal() {
    this.displayModal = 'block';
  }

  closeModal(event?: Event) {
    if (!event || event.target === this.modalContent.nativeElement) {
      this.displayModal = 'none';
    }
  }

  sendMessage() {
    // Logic to send message
    console.log('Sending birthday message...');
  }
  

  async getStudentRecord() {
    this.registrationService.studentList(new Registration()).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.posts = res.data;
      }

      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentDay = today.getDate();

      this.todayBirthdayStudents = this.posts.filter(student => {
        const [year, month, day] = student.dateOfBirth.split('-');
        return Number(month) === currentMonth && Number(day) === currentDay;
      });
    })
  }
}
