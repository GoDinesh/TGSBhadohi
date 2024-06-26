import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, map } from 'rxjs';
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
import { FeesReceiptPrintoutComponent } from '../../printout/fees-receipt-printout/fees-receipt-printout.component';


@Component({
  selector: 'app-fees-collection',
  templateUrl: './fees-collection.component.html',
  styleUrls: ['./fees-collection.component.css']
})
export class FeesCollectionComponent {
  feesModel: Fees = new Fees();
  dataSource = new MatTableDataSource<Registration>();
  dtOptions: any = {};
  posts: Fees[] = [];
  receiptFeesModel: Fees = new Fees();
  maxDate = new Date();
  isDisabled = true;
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  editable: boolean | undefined;
  totalCollection: number = 0;
  @ViewChild('receiptComponent') receiptComponent: FeesReceiptPrintoutComponent;

  studentgroup = new FormGroup({
    standard: new FormControl(),
    academicYearCode: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    paymentMode: new FormControl(),
    paymenttype: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private academicYearService: AcademicYearService,
    public validationMsg: ValidationErrorMessageService,
    private sweetAlertService: SweetAlertService,
    private permissionService: PermissionService,
    private router: Router,
    private authService:AuthService,
    private feesService: FeesService,
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
    this.createStudentForm(new Fees());
    this.updateEditable();
    this.loadClass();
    this.loadAcademicyear();
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createStudentForm(fees: Fees) {
    this.studentgroup = this.formBuilder.group({
      standard: [fees.classCode],
      academicYearCode: [fees.academicYearCode,[Validators.required]],
      startDate:[fees.startDate],
      endDate: [ fees.endDate],
      paymentMode: [fees.paymentMode],
      paymenttype: [fees.paymenttype]

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
    const fees: Fees = new Fees();
    fees.academicYearCode = this.studentFormControll.academicYearCode.value;
    fees.classCode = this.studentFormControll.standard.value;
    fees.startDate = moment(this.studentFormControll.startDate.value).format(msgTypes.YYYY_MM_DD);
    fees.endDate = moment(this.studentFormControll.endDate.value).format(msgTypes.YYYY_MM_DD);
    fees.paymentMode = this.studentFormControll.paymentMode.value;
    fees.paymenttype = this.studentFormControll.paymenttype.value;

    this.feesService.getPaidFeesOfStudent(fees).subscribe(res=>{
      this.totalCollection = 0;
    if(res.status === msgTypes.SUCCESS_MESSAGE){
      if(res.data.length>0){
          this.posts = res.data;
          this.posts.map(data=>{
            data.paymenttype=='Book Fees'? data.paymenttype='SSM Fees':''
          })
          res.data.forEach((data:Fees) => {
            this.totalCollection+=data.amount;
          });
      }else{
        this.posts = [];
        this.sweetAlertService.showAlert(msgTypes.WARNING, msgTypes.NO_RECORD_FOUND, msgTypes.WARNING, msgTypes.OK_KEY);
      }
      }
      })
  }

 

  resetForm() {
    this.createStudentForm(new Fees())
    this.posts = [];
    this.totalCollection = 0;
  }

  async printReceipt(data:Fees)  {
    this.receiptFeesModel = data;
    this.receiptFeesModel.paymentDate = moment(this.receiptFeesModel.paymentDate).format(msgTypes.DD_MM_YYYY);
    setTimeout(() => {
      let el: HTMLElement = this.receiptComponent.childElement.nativeElement;
      el.click();  
    }, 200);
    
  }
}
