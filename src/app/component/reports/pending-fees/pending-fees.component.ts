import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Fees } from 'src/app/model/fees/fees.model';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { FeesService } from 'src/app/service/fees/fees.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { RegistrationService } from 'src/app/service/student/registration.service';


@Component({
  selector: 'app-pending-fees',
  templateUrl: './pending-fees.component.html',
  styleUrls: ['./pending-fees.component.css']
})
export class PendingFeesComponent {
  studentInfo: Registration = new Registration();
  dataSource = new MatTableDataSource<Registration>();
  dtOptions: any = {};
  posts: Registration[] = [];
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  editable: boolean | undefined;
  totalPendingFees: number = 0;
  monthName: string ="";
  monthArray=[
        {key:"Apr", value:"04"},
        {key:"May", value:"05"},
        {key:"Jun", value:"06"},
        {key:"Jul", value:"07"},
        {key:"Aug", value:"08"},
        {key:"Sep", value:"09"},
        {key:"Oct", value:"10"},
        {key:"Nov", value:"11"},
        {key:"Dec", value:"12"},
        {key:"Jan", value:"01"},
        {key:"Feb", value:"02"},
        {key:"Mar", value:"03"},
      ];
 
    studentgroup = new FormGroup({
    standard: new FormControl(),
    academicYearCode: new FormControl(),
    temp: new FormControl()
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
    private authService: AuthService,
    private feesService:FeesService
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

  createStudentForm(reg: Registration) {
    this.studentgroup = this.formBuilder.group({
      standard: [reg.standard],
      academicYearCode: [reg.academicYearCode, [Validators.required]],
      temp: [reg.temp, [Validators.required]]
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
      scrollX: true,
      dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"lip><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
  }

  //To get Student List
  async getTableRecord() {
    
    const reg: Registration = new Registration();
    reg.academicYearCode = this.studentFormControll.academicYearCode.value;
    reg.standard = this.studentFormControll.standard.value;
    reg.temp = this.studentFormControll.temp.value;
    this.posts = [];
    this.totalPendingFees = 0 ;
    this.feesService.getPendingFees(reg).subscribe(res=>{
      this.posts = res.data 
      res.data.map((data:Registration)=>{
        this.totalPendingFees += data.pendingFees
      })
    })


    // const studentInfo: Registration = new Registration();
    // studentInfo.academicYearCode = this.studentFormControll.academicYearCode.value;
    // studentInfo.standard = this.studentFormControll.standard.value;
   
    // this.registrationService.studentList(studentInfo).subscribe(res => {
    //   this.posts = [];
    //   if (res.status === msgTypes.SUCCESS_MESSAGE) {
    //     if (res.data.length > 0) {
    //       this.posts = res.data;
    //       this.posts = this.posts.filter(data => {
    //         return data.isTotalFeesPaid === false
    //       })
    //     }
    //     if (this.posts.length == 0) {
    //       this.posts = [];
    //       this.sweetAlertService.showAlert(msgTypes.WARNING, msgTypes.NO_RECORD_FOUND, msgTypes.WARNING, msgTypes.OK_KEY);
    //     }
    //   }else{
    //     this.posts = [];
    //     this.sweetAlertService.showAlert(msgTypes.WARNING, msgTypes.NO_RECORD_FOUND, msgTypes.WARNING, msgTypes.OK_KEY);
    //   }
    // })
  }

  //Action for Payin Details
  payFees(registration: Registration) {
    const url = appurl.navmenu + appurl.menuurl_fees + appurl.pay_fees;
    const encryptData = this.authService.getEncryptText(JSON.stringify(registration));
    this.router.navigate([url], {
      state: {data: JSON.stringify(encryptData)}
      // queryParams: {
      //   data: JSON.stringify(encryptData)
      // }
    });
  }


  resetForm() {
    this.createStudentForm(new Registration())
    this.posts = [];
  }

  monthChange(){
    const month= this.studentgroup.controls.temp.value;
    const monthData = this.monthArray.filter((data)=>{
       return data.value == month;
    })
    this.monthName = monthData[0].key;
  }
}
