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
import { BookAndDressFees } from 'src/app/model/master/book-and-dress-fees.model';
import { BookAndDressFeesService } from 'src/app/service/masters/book-and-dress-fees.service';
import { StudentFeesStructure } from 'src/app/model/fees/student-fees-structure.model';
import { StudentFeesInstallment } from 'src/app/model/fees/student-fees-installment.model';

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
  promoteYear: AcademicYear[] = [];
  promoteAcademicYearList: AcademicYear[]=[];
  editable: boolean | undefined;
  checkedFlag: boolean = false;
  bookFees: number = 0;

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
    private bookDressFeesService: BookAndDressFeesService
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
        this.promoteYear = res.data;
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
        this.posts = res.data.filter((data: Registration) => { return data.isActive === true })
        .map((data:Registration)=>{
          const feesStructure = data.studentFeesStructure.filter((structure:StudentFeesStructure)=>{
            return data.academicYearCode=== structure.academicYearCode;
          });

          var additionalDiscount = 0;
          feesStructure[0]?.studentFeesInstallment.map((installment: StudentFeesInstallment)=>{
            additionalDiscount += Number(installment.discountAmount);
          })
          console.log(additionalDiscount);
          data.discountAmount = data.discountAmount + additionalDiscount;
          data.pendingFees = data.totalFees - (data.discountAmount + data.paidFees )
          return data;

        });
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
                    x.bookFees = this.bookFees;
                    x.pendingBookFees = this.bookFees;
                    const classData = this.classList.filter((res) => {
                      return res.classCode === x.standard
                    })
                    // rollnumber = rollnumber + 1;
                    const increasedRollNumber = this.convertIntoTwoDegit(rollnumber);
                    rollnumber = rollnumber + 1;
                    x.idCardNumber = "TGS"+ promotedAcademicYear.substring(2,4)+"-"+promotedAcademicYear.substring(6,8)+classData[0].className+"/"+increasedRollNumber
                    //x.idCardNumber = "TGS" + promotedAcademicYear.substring(0, 4) + classData[0].className + "/" +increasedRollNumber
                    this.promotedStudentList.push(x)
                  }
                }
              })
            })
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
              }else{
                  this.loadBookFees();
              }
            }
          })

        }

      }

      handleInputChange(formcontrol: FormControl){
        formcontrol.setValue(formcontrol.value.replace(/\b\w/g, (first: string) => first.toLocaleUpperCase()));
      }

      academicYearChange(){
            const selectedYear= this.studentgroup.controls.academicYearCode.value;
            this.promoteAcademicYearList=[];
            this.promoteAcademicYearList = this.promoteYear.filter(res=>{
              return res.academicYearCode.substring(0,4)===selectedYear.substring(4,8);
            })
            this.resetForm();
            this.studentFormControll.academicYearCode.setValue(selectedYear);
      }


      //Book Fees related functions
loadBookFees() {
  this.bookFees=0;

  const bookDressFees: BookAndDressFees = new BookAndDressFees();
  bookDressFees.academicYearCode = this.promotedStudentFormControll.promotedAcademicYearCode.value;
  bookDressFees.standard = this.promotedStudentFormControll.promotedStandard.value;

  if(bookDressFees.academicYearCode.length>0 && bookDressFees.standard.length>0){
    this.bookDressFeesService.getByAcademicAndClass(bookDressFees).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        if(res.data.length>0){
          this.bookFees=res.data[0].bookFees;
        }else{
          this.promotedStudentFormControll.promotedAcademicYearCode.reset();
          this.promotedStudentFormControll.promotedStandard.reset();
          this.alertService.showAlert(msgTypes.ERROR_MESSAGE, "Please enter SSM Fees for selected Academic Year and class.", msgTypes.ERROR, msgTypes.OK_KEY)
        }
      }
    });
  }else{
    this.promotedStudentFormControll.promotedAcademicYearCode.reset();
    this.promotedStudentFormControll.promotedStandard.reset();
    this.alertService.showAlert(msgTypes.ERROR_MESSAGE, "Please enter SSM Fees for selected Academic Year and class.", msgTypes.ERROR, msgTypes.OK_KEY)
  }
}
    }
