import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { msgTypes } from 'src/app/constants/common/msgType';
import { StudentFeesStructure } from 'src/app/model/fees/student-fees-structure.model';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { Notifications } from 'src/app/model/notification/notification.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent {
  notificationTypes=[{type: msgTypes.NOTIFICATION_TYPE.FEES},{type: msgTypes.NOTIFICATION_TYPE.HOLIDAY}, {type: msgTypes.NOTIFICATION_TYPE.EXAMINATION}, {type: msgTypes.NOTIFICATION_TYPE.EVENT}, {type: msgTypes.NOTIFICATION_TYPE.GENERAL}]
  studentList: Observable<ResponseModel> = new Observable();
  registrationModel: Observable<ResponseModel> = new Observable();
  studentFeeStructure: StudentFeesStructure = new StudentFeesStructure();
  classList: Class[] = [];
  academicyearList: AcademicYear[] = [];

  editable: boolean | undefined;

  formgroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private classService: ClassService,
    private academicYearService: AcademicYearService,
    private registrationService: RegistrationService,
    private sweetAlertService: SweetAlertService,
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionService,
    private notificationService: NotificationService
  ) {
  }

    //load ngOnInit
    ngOnInit() {
      this.createNotificationForm();
      this.customInit();
      this.updateEditable();
    }

    private updateEditable(): void {
      this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
        this.editable = editable;
      });
    }

    createNotificationForm() {
      this.formgroup = this.formBuilder.group({
        notificationId: [0],
        academicYearCode: ['', [Validators.required]],
        standard: ['', [Validators.required]],
        registrationNo: ['', [Validators.required]],
        studentName: [''],
        notificationType: ['', [Validators.required]],
        notificationTitle:['',[Validators.required]],
        notificationMessage:['',[Validators.required]],
        isReaded: [false],
        createdAt: [new Date().toISOString()],
        extraData: [{}]
      });
    }

    async customInit() {
      this.loadClass();
      this.loadAcademicyear();
    }

    loadClass() {
      this.classService.getAllActiveClass().subscribe(res => {
        this.classList = res.data
      });
    };

    loadAcademicyear() {
      this.academicYearService.getAllActiveAcademicYear().subscribe(res => {
        this.academicyearList = res.data;
      });
    };

    loadStudentList() {
      this.studentList = new Observable();
      this.notificationControll.registrationNo.reset();
      const reg = new Registration();
      reg.academicYearCode = this.notificationControll.academicYearCode.value;
      reg.standard = this.notificationControll.standard.value;
      this.studentList = this.registrationService.studentList(reg);
    }

    academicYearChange() {
      this.notificationControll.registrationNo.reset();
      this.notificationControll.standard.reset();
    }

    //get Notification formcontroll
    get notificationControll() {
      return this.formgroup.controls;
    }

    resetForm(){
      this.createNotificationForm();
    }

    async sendNotification(){
      if (!this.formgroup.value) {
        this.sweetAlertService.showAlert("Error", "Please fill all required fields", "error", "OK");
        return
     }

      if(this.formgroup.value){
        let notificationList: Notifications[] = [];
        const response: any = await this.studentList.toPromise();
        const allStudent: Registration[] = response.data;
        const registrationNumbers = this.notificationControll.registrationNo.value;
             registrationNumbers.forEach(async (registrationNo: string) => {
                  const student = allStudent.find((x: Registration) => x.registrationNo === registrationNo);
                  let notification = new Notifications();
                  notification.notificationType = this.notificationControll.notificationType.value;
                  notification.notificationTitle = this.notificationControll.notificationTitle.value;
                  notification.notificationMessage = this.notificationControll.notificationMessage.value;
                  notification.academicYearCode = this.notificationControll.academicYearCode.value;
                  notification.standard = this.notificationControll.standard.value;
                  notification.registrationNo = student ? student.registrationNo : '';
                  notification.studentName = student ? student.studentName : '';
                  notificationList.push(notification);
              });
              this.notificationService.saveNotification(notificationList).subscribe((res) => {
                    if (res.status === msgTypes.SUCCESS_MESSAGE) {
                      //this.getTableRecord();
                      this.resetForm();
                    }
                  });


    }


}

      }

