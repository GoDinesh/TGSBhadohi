import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { Registration } from 'src/app/model/student/registration.model';
import { StudentInfo } from 'src/app/model/student/student-info.model';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  //displayedColumns = ["sNo","registrationNo","studentName","gender","dateOfBirth","standard","aadhaarNumber"];
  studentInfo: StudentInfo = new  StudentInfo();
  dataSource = new MatTableDataSource < Registration > ();
  dtOptions: any = {};
  posts:Registration[]=[];
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
 
  studentgroup = new FormGroup({
        standard            : new FormControl(),
        academicYearCode        : new FormControl(),
  });

  constructor(
              private formBuilder: FormBuilder, 
              private registrationService: RegistrationService,
              private classService: ClassService,
              private academicYearService: AcademicYearService,
              private alerService: SweetAlertService,
              public validationMsg: ValidationErrorMessageService,
               ){
  }

   //get student formcontroll
   get studentFormControll(){
    return this.studentgroup.controls;
  }

  ngOnInit(){
    this.customInit();
    this.loadTable();
  }

  customInit(){
    this.createStudentForm();
    this.loadClass();
    this.loadAcademicyear();
  }

  createStudentForm(){
    this.studentgroup = this.formBuilder.group({
      standard: [''],
      academicYearCode: [''],
    });
  }

  loadClass(){
    this.allClassList = this.classService.getAllClass().pipe(
      map((res)=>{
          return res.data;
      })
  )};
  
  loadAcademicyear(){
    this.academicYearList = this.academicYearService.getAllAcademicYear().pipe(
      map((res)=>{
          return res.data;
      })
  )};


   //load the table
   loadTable(){
        this.dtOptions = {
          processing: true,
          scrollY: "300px",
          scrollCollapse: true,
          dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"><"clear">',
          buttons: [
            'copy', 'csv', 'excel', 'print'
          ]
        };
  }

  //To get Student List
  async getTableRecord() {
    const studentInfo: StudentInfo = new StudentInfo();
    studentInfo.academicYearCode = this.studentgroup.controls.academicYearCode.value ;
    studentInfo.standard = this.studentgroup.controls.standard.value

    this.registrationService.studentList(studentInfo).subscribe(res=>{
        if(res.status === msgTypes.SUCCESS_MESSAGE){
          this.posts = res.data;
        }
    });
  }

  resetForm(){
    this.studentgroup.reset();
    this.posts = [];
  }
}
