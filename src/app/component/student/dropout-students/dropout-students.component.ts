import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
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
  selector: 'app-dropout-students',
  templateUrl: './dropout-students.component.html',
  styleUrls: ['./dropout-students.component.css']
})
export class DropoutStudentsComponent {
  studentList: Observable<ResponseModel> = new Observable();
  studentInfo: Registration = new Registration();
   dataSource = new MatTableDataSource<Registration>();
   dtOptions: any = {};
   posts: Registration[] = [];
   allClassList: Observable<Class[]> = new Observable();
   academicYearList: Observable<AcademicYear[]> = new Observable();
   editable: boolean | undefined;
   dropoutStudentDetails: Registration = new Registration();
   status: number = 0;

   studentgroup = new FormGroup({
     standard: new FormControl(),
     academicYearCode: new FormControl(),
     registrationNo: new FormControl()
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
     private authService:AuthService,
     private alertService: SweetAlertService,
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
       academicYearCode: [registartion.academicYearCode],
       registrationNo: [registartion.registrationNo]
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

   loadStudentList() {
    this.status=0;
    this.dropoutStudentDetails=new Registration();

    this.studentList = new Observable();
    this.studentgroup.controls.registrationNo.reset();
    const reg = new Registration();
    reg.academicYearCode = this.studentgroup.controls.academicYearCode.value;
    reg.standard = this.studentgroup.controls.standard.value;
    this.studentList = this.registrationService.studentList(reg);
  }

  studentSelected(){
     this.status=0;
    this.dropoutStudentDetails=new Registration();
  }


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
   async getStudentDetails() {
    this.status = 2;
     const studentInfo: Registration = new Registration();
     studentInfo.academicYearCode = this.studentFormControll.academicYearCode.value;
     studentInfo.standard = this.studentFormControll.standard.value;
     studentInfo.registrationNo = this.studentFormControll.registrationNo.value;
     studentInfo.dropout=true;

     this.registrationService.dropoutStudentList(studentInfo).subscribe(res=>{
      if(res.status === msgTypes.SUCCESS_MESSAGE){
       if(res.data.length>0){
           this.posts = res.data;
           if(this.posts.length == 0){
             this.sweetAlertService.showAlert(msgTypes.WARNING, msgTypes.NO_RECORD_FOUND, msgTypes.WARNING, msgTypes.OK_KEY);
           }
         }
       }
       })
   }

   dropoutStudentDetailsList(){
    this.status = 1;
     const studentInfo: Registration = new Registration();
     studentInfo.academicYearCode = this.studentFormControll.academicYearCode.value;
     studentInfo.standard = this.studentFormControll.standard.value;
     studentInfo.registrationNo = this.studentFormControll.registrationNo.value;

     this.registrationService.studentList(studentInfo).subscribe(res=>{
      if(res.status === msgTypes.SUCCESS_MESSAGE){
       if(res.data.length>0){
        this.dropoutStudentDetails = res.data[0];
        // console.log(this.dropoutStudentDetails);

          //  this.posts = res.data;
          //  this.posts= this.posts.filter(data=>{
          //    return (data.aadhaarNumber==="" || data.fatherAadharNo==="" || data.motherAadharNumber==="")
          //  })
          //  if(this.posts.length == 0){
          //    this.sweetAlertService.showAlert(msgTypes.WARNING, msgTypes.NO_RECORD_FOUND, msgTypes.WARNING, msgTypes.OK_KEY);
          //  }
         }
       }
       })
   }

   async dropoutTheStudent(){
     const studentInfo: Registration = new Registration();
     studentInfo.academicYearCode = this.studentFormControll.academicYearCode.value;
     studentInfo.standard = this.studentFormControll.standard.value;
     studentInfo.registrationNo = this.studentFormControll.registrationNo.value;
     const flag = await this.alertService.dropoutStudentAlert()
     if (flag) {
       this.registrationService.dropoutStudent(studentInfo).subscribe(res=>{
       if(res.status === msgTypes.SUCCESS_MESSAGE){
          this.alertService.showAlert("Dropout", "Student Successfully Dropout.", msgTypes.SUCCESS, msgTypes.OK_KEY);
          this.dropoutStudentDetailsList();
       }
       })
      }
   }


  //  resetForm() {
  //    this.createStudentForm(new Registration())
  //    this.posts = [];
  //  }

}
