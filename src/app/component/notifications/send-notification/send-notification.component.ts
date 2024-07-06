import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentFeesStructure } from 'src/app/model/fees/student-fees-structure.model';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { Notification } from 'src/app/model/shared/notification.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent {
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
        classCode: ['', [Validators.required]],
        academicYearCode: ['', [Validators.required]],
        registrationNo: ['', [Validators.required]],
        title:['',[Validators.required]],
        message:['',[Validators.required]]
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
      reg.standard = this.notificationControll.classCode.value;
      this.studentList = this.registrationService.studentList(reg);
    }
  
    academicYearChange() {
      this.notificationControll.registrationNo.reset();
      this.notificationControll.classCode.reset();
    }
  
    //get Notification formcontroll
    get notificationControll() {
      return this.formgroup.controls;
    }

    resetForm(){
      this.createNotificationForm();
    }
  
    sendNotification(){

    }
}
