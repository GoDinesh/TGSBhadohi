import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
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
import { CustomValidation } from 'src/app/validators/customValidation';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
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
    registrationNo: new FormControl(),
    fatherContactNo: new FormControl(),
    studentName: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private classService: ClassService,
    private academicYearService: AcademicYearService,
    private alertService: SweetAlertService,
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
    //this.getTableRecord();
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createStudentForm(registartion: Registration) {
    this.studentgroup = this.formBuilder.group({
      registrationNo: [registartion.registrationNo, [CustomValidation.alphanumaricSpace]],
      standard: [registartion.standard],
      academicYearCode: [registartion.academicYearCode],
      fatherContactNo: [registartion.fatherContactNo, [CustomValidation.numeric]],
      studentName: [registartion.studentName, [CustomValidation.alphanumaricSpace]]
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
    studentInfo.registrationNo = this.studentFormControll.registrationNo.value;
    studentInfo.fatherContactNo = this.studentFormControll.fatherContactNo.value;
    studentInfo.studentName = this.studentFormControll.studentName.value;

    this.registrationService.studentList(studentInfo).subscribe(res=>{
      console.log(res);
      
        if(res.status === msgTypes.SUCCESS_MESSAGE){
          this.posts = res.data;
          if(res.data.length == 0){
            this.sweetAlertService.showAlert(msgTypes.ERROR, msgTypes.NO_RECORD_FOUND, msgTypes.ERROR, msgTypes.OK_KEY);
          }
        }
      })
  }

  viewDetails(registration: Registration){
    //this.router.navigateByUrl(appurl.navmenu + appurl.menuurl_student + appurl.student_details, { state: { studetails: registration } });  
    const url = appurl.navmenu + appurl.menuurl_student + appurl.student_details;
    const encryptData = this.authService.getEncryptText(JSON.stringify(registration));
    this.router.navigate([url], {
        queryParams: {
            data: JSON.stringify(encryptData)
        }
    });
  }

  setVlaueToUpdate(stuDetails: Registration) {
    //this.router.navigateByUrl(appurl.navmenu + appurl.menuurl_student + appurl.student_registration, { state: { studetails: stuDetails } });
    const url = appurl.navmenu + appurl.menuurl_student + appurl.student_registration;
    const encryptData = this.authService.getEncryptText(JSON.stringify(stuDetails));
    this.router.navigate([url], {
        queryParams: {
            data: JSON.stringify(encryptData)
        }
    });
  }

  //Action for Payin Details
  payFees(registration: Registration) {
    const url = appurl.navmenu + appurl.menuurl_fees+ appurl.pay_fees;
    const encryptData = this.authService.getEncryptText(JSON.stringify(registration));
    this.router.navigate([url], {
        queryParams: {
            data: JSON.stringify(encryptData)
        }
    });
}


  resetForm() {
    this.createStudentForm(new Registration())
    this.posts = [];
  }
}
