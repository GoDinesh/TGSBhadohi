import { Component, ElementRef, ViewChild } from '@angular/core';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Registration } from 'src/app/model/student/registration.model';
import { SmsService } from 'src/app/service/common/sms.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

@Component({
  selector: 'app-student-birthday',
  templateUrl: './student-birthday.component.html',
  styleUrls: ['./student-birthday.component.css']
})
export class StudentBirthdayComponent {

  posts: Registration[] = [];
  todayBirthdayStudents: Registration[] = [];
  constructor(private registrationService: RegistrationService,
    private smsService: SmsService){
  }

  ngOnInit() {
    this.getStudentRecord();
  }

  displayModal: string = 'none';
  displayBirthdayModal: string = 'none';
  @ViewChild('modalContent') modalContent: ElementRef;
  @ViewChild('modalBirthdayContent') modalBirthdayContent: ElementRef;

  openModal() {
    this.displayModal = 'block';
  }

  closeModal(event?: Event) {
    if (!event || event.target === this.modalContent.nativeElement) {
      this.displayModal = 'none';
    }
  }

  openBirthdayModal() {
    this.displayBirthdayModal = 'block';
    this.displayModal = 'none';
  }

  closeBirthdayModal(event?: Event) {
    if (!event || event.target === this.modalBirthdayContent.nativeElement) {
      this.displayBirthdayModal = 'none';
    }
  }

  sendMessage() {
    const message = 'Happy Birthday Gurruu!';
    const studentNumber = '+919140744685';
  
    this.smsService.sendSMS(message, studentNumber).subscribe(response => {
      //Successfull
    }, error => {
      console.error('Error sending SMS', error);
    });

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
