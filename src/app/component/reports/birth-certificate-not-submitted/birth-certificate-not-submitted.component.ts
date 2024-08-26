import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { map, Observable } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

@Component({
  selector: 'app-birth-certificate-not-submitted',
  templateUrl: './birth-certificate-not-submitted.component.html',
  styleUrls: ['./birth-certificate-not-submitted.component.css']
})
export class BirthCertificateNotSubmittedComponent {
  studentInfo: Registration = new Registration();
  dataSource = new MatTableDataSource<Registration>();
  dtOptions: any = {};
  posts: Registration[] = [];
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  editable: boolean | undefined;

  studentgroup = new FormGroup({
    standard: new FormControl(),
    academicYearCode: new FormControl(),
  });

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private classService: ClassService,
    private academicYearService: AcademicYearService,
    public validationMsg: ValidationErrorMessageService,
    private sweetAlertService: SweetAlertService,
    private permissionService: PermissionService,
    private router: Router,
    private authService:AuthService
  ) {
  }

  //get student formcontroll
  get studentFormControll() {
    return this.studentgroup.controls;
  }

  ngOnInit() {
    this.customInit();
    this.loadTable();
  }

  customInit() {
    this.createStudentForm(new Registration());
    this.updateEditable();
    this.loadClass();
    this.loadAcademicyear();
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createStudentForm(registartion: Registration) {
    this.studentgroup = this.formBuilder.group({
      standard: [registartion.standard],
      academicYearCode: [registartion.academicYearCode,[Validators.required]],
     });
  }

  loadClass() {
    this.allClassList = this.classService.getAllActiveClass().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  loadAcademicyear() {
    this.academicYearList = this.academicYearService.getAllActiveAcademicYear().pipe(
      map((res) => {
        return res.data;
      })
    )
  };


  //load the table
  loadTable() {
    this.dtOptions = {
      processing: true,
      scrollY: "300px",
      scrollCollapse: true,
      fixedColumns: {
       // leftColumns: 1,
        rightColumns: 1,
      },
      scrollX : true,
      dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"lip><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
  }

  //To get Student List
  async getTableRecord() {
    const studentInfo: Registration = new Registration();
    studentInfo.academicYearCode = this.studentFormControll.academicYearCode.value;
    studentInfo.standard = this.studentFormControll.standard.value;
  
    this.registrationService.studentList(studentInfo).subscribe(res=>{
     if(res.status === msgTypes.SUCCESS_MESSAGE){
      if(res.data.length>0){
          this.posts = res.data;
          this.posts= this.posts.filter(data=>{
            return (data.birthCirtificateSubmitted==="No" || data.birthCirtificateSubmitted===null || 
              data.birthCirtificateSubmitted==="null" || data.birthCirtificateSubmitted===undefined
            )
          })
          if(this.posts.length == 0){
            this.sweetAlertService.showAlert(msgTypes.WARNING, msgTypes.NO_RECORD_FOUND, msgTypes.WARNING, msgTypes.OK_KEY);
          }
        }
      }
      })
  }

  setVlaueToUpdate(stuDetails: Registration) {
    //this.router.navigateByUrl(appurl.navmenu + appurl.menuurl_student + appurl.student_registration, { state: { studetails: stuDetails } });
    const url = appurl.navmenu + appurl.menuurl_student + appurl.student_registration;
    const encryptData = this.authService.getEncryptText(JSON.stringify(stuDetails));
    this.router.navigate([url], {
      state: {data: JSON.stringify(encryptData)}
        // queryParams: {
        //     data: JSON.stringify(encryptData)
        // }
    });
  }


  resetForm() {
    this.createStudentForm(new Registration())
    this.posts = [];
  }
}
