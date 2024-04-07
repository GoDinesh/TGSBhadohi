import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { RegistrationService } from 'src/app/service/student/registration.service';
import { CustomValidation } from 'src/app/validators/customValidation';
import { Class } from 'src/app/model/master/class.model';
import { FeesStructure } from 'src/app/model/master/fees-structure.model';
import { FeesStructureService } from 'src/app/service/masters/fees-structure.service';

@Component({
  selector: 'app-promote-student',
  templateUrl: './promote-student.component.html',
  styleUrls: ['./promote-student.component.css']
})
export class PromoteStudentComponent {
  studentInfo: Registration = new Registration();
  dataSource = new MatTableDataSource<Registration>();
  dtOptions: any = {};
  posts: Registration[] = [];
  //tempPost: Registration[]=[];
  tempData: Registration[] = [];
  promotedStudentList: Registration[] = [];
  allClassList: Observable<Class[]> = new Observable();
  classList: Class[] = [];
  academicYearList: Observable<AcademicYear[]> = new Observable();
  editable: boolean | undefined;
  checkedFlag: boolean = false;

  studentgroup = new FormGroup({
    standard: new FormControl(),
    academicYearCode: new FormControl(),
    registrationNo: new FormControl(),
    fatherContactNo: new FormControl(),
    studentName: new FormControl()
  });

  promotedStudentGroup = new FormGroup({
    promotedStandard: new FormControl(),
    promotedAcademicYearCode: new FormControl(),
    enrollmentType: new FormControl()
  })

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
    private authService: AuthService,
    private feesStructureService: FeesStructureService,
  ) {
  }

  //get student formcontroll
  get studentFormControll() {
    return this.studentgroup.controls;
  }

  //get promoted student controll
  get promotedStudentFormControll() {
    return this.promotedStudentGroup.controls;
  }

  ngOnInit() {
    this.customInit();
    this.loadTable();
  }

  customInit() {
    this.createStudentForm(new Registration());
    this.promotedStudentForm();
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
      registrationNo: [registartion.registrationNo, [CustomValidation.alphanumaricSpace]],
      standard: [registartion.standard, [Validators.required]],
      academicYearCode: [registartion.academicYearCode, [Validators.required]],
      fatherContactNo: [registartion.fatherContactNo, [CustomValidation.numeric]],
      studentName: [registartion.studentName, [CustomValidation.alphanumaricSpace]]
    });
  }

  promotedStudentForm() {
    this.promotedStudentGroup = this.formBuilder.group({
      promotedStandard: ['', [Validators.required]],
      promotedAcademicYearCode: ['', [Validators.required]],
      enrollmentType: ['Old Student', [Validators.required]]

    });
  }

  loadClass() {
    this.allClassList = this.classService.getAllActiveClass().pipe(
      map((res) => {
        this.classList = res.data;
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
      scrollX: true,
      dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"lip><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ],
      columnDefs: [
        {
          'targets': 0,
          'checkboxes': {
            'selectRow': true
          }
        }
      ],
      select: {
        'style': 'multi'
      },
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

    this.registrationService.studentList(studentInfo).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.posts = res.data.filter((data: Registration) => { return data.isActive === true });
        if (this.posts.length == 0) {
          this.sweetAlertService.showAlert(msgTypes.SUCCESS, msgTypes.NO_RECORD_FOUND, msgTypes.ERROR, msgTypes.OK_KEY);
        }
      }
    })
  }


  resetForm() {
    this.createStudentForm(new Registration())
    this.promotedStudentFormControll.promotedAcademicYearCode.reset();
    this.promotedStudentFormControll.promotedStandard.reset();
    this.posts = [];
    this.tempData = [];
    this.promotedStudentList = [];
    this.checkedFlag = false;
  }

  checkAllCheckBox(ev: any) {
    this.posts.forEach(x => x.isChecked = ev.target.checked)
    if (ev.target.checked === true)
      this.checkedFlag = true;
    else
      this.checkedFlag = false;
  }

  isAllCheckBoxChecked() {
    return this.posts.every(p => p.isChecked);
  }

  convertIntoTwoDegit(n:string) {
    n = String(n)
    if (n.length == 1)
      n = '0' + n
    return n
  }

  promoteStudent() {
    this.promotedStudentList = [];
    const promotedAcademicYear = this.promotedStudentFormControll.promotedAcademicYearCode.value;
    const promotedStandard = this.promotedStudentFormControll.promotedStandard.value;

    let reg: Registration = new Registration();
    reg.academicYearCode = promotedAcademicYear;
    reg.standard = promotedStandard;

    this.registrationService.getRollNumber(reg).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        let rollnumber = res.data[0].rollNumber;

        this.registrationService.studentList(this.studentInfo).subscribe(res => {
          //prepare promoted student list i.e mark as promote by using checkbox
          if (res.status === msgTypes.SUCCESS_MESSAGE) {
            this.tempData = res.data;
            let reg: Registration[] = [];
            let updateStatus: Registration[] = [];
            this.posts.forEach(x => {
              this.tempData.forEach(data => {
                if (data.registrationNo === x.registrationNo && data.registrationId === x.registrationId) {
                  if (x.isChecked) {
                    updateStatus.push(data);
                    reg.push(x);
                    x.registrationId = "";
                    x.academicYearCode = promotedAcademicYear;
                    x.standard = promotedStandard;
                    x.isPromoted = x.isChecked;
                    x.studentFeesStructure = [];
                    const classData = this.classList.filter((res) => {
                      return res.classCode === x.standard
                    })
                    // rollnumber = rollnumber + 1;
                    const increasedRollNumber = this.convertIntoTwoDegit(rollnumber);
                    rollnumber = rollnumber + 1;
                    x.idCardNumber = "TGS" + promotedAcademicYear.substring(0, 4) + classData[0].className + "/" +increasedRollNumber
                    this.promotedStudentList.push(x)
                  }
                }
              })
            })
            //send request to promote the student
            //console.log(this.promotedStudentList);
            this.registrationService.promoteStudent(this.promotedStudentList).subscribe(res => {
              if (res.status === msgTypes.SUCCESS_MESSAGE) {
                this.registrationService.updateStatusAfterPromote(updateStatus).subscribe(res => {
                  this.resetForm();
                });
              }
            })

          }
        })
      }else{
        this.sweetAlertService.showAlert("Id Card Error", "Id Card not generated", msgTypes.ERROR, msgTypes.OK_KEY);
      }
    })//closing if get rollnumber if
  }

      selectCheckBox(registration: Registration, ev: any){
        let count = 0;
        this.posts.map(data => {
          if (data.isChecked === true) {
            count++;
          }
          if (data.registrationId === registration.registrationId && data.registrationNo === registration.registrationNo) {
            data.isChecked = ev.target.checked;
            if (ev.target.checked === true) {
              count++;
            } else {
              count--;
            }
          }

          if (count > 0) {
            this.checkedFlag = true;
          } else {
            this.checkedFlag = false;
          }
        })


      }

      isFeesStructureAvailable() {
        const academicYearCode = this.promotedStudentFormControll.promotedAcademicYearCode.value;
        const standard = this.promotedStudentFormControll.promotedStandard.value;
        const enrollmentType = this.promotedStudentFormControll.enrollmentType.value;
        if ((standard != '' && standard != null && standard != undefined)
          && (academicYearCode != '' && academicYearCode != null && academicYearCode != undefined)
          && (enrollmentType != '' && enrollmentType != null && enrollmentType != undefined)
        ) {
          const feesStructure = new FeesStructure();
          feesStructure.academicYearCode = academicYearCode;
          feesStructure.classCode = standard;
          feesStructure.enrollmentType = enrollmentType;
          this.feesStructureService.getByAcademicYearAndClassAndEnrollmentType(feesStructure).subscribe((res) => {
            if (res.status === msgTypes.SUCCESS_MESSAGE) {
              if (res.data.length == 0) {
                this.alertService.showAlert(msgTypes.ERROR_MESSAGE, "Fees Structure is not created", msgTypes.ERROR, msgTypes.OK_KEY)
                this.promotedStudentFormControll.promotedAcademicYearCode.reset();
                this.promotedStudentFormControll.promotedStandard.reset();
              }
            }
          })

        }

      }

      handleInputChange(formcontrol: FormControl){
        formcontrol.setValue(formcontrol.value.replace(/\b\w/g, (first: string) => first.toLocaleUpperCase()));
      }
    }
