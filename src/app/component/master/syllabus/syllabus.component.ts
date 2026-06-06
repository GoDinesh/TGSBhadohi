import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { map, Observable, Subject } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { Subjects } from 'src/app/model/master/subjects.model';
import { SyllabusSubjectDetails } from 'src/app/model/master/syllabus-subject-details.model';
import { Syllabus } from 'src/app/model/master/syllabus.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { SubjectService } from 'src/app/service/masters/subject.service';
import { SyllabusService } from 'src/app/service/masters/syllabus.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.css']
})
export class SyllabusComponent {
  studentInfo: Registration = new Registration();
  dataSource = new MatTableDataSource<Registration>();
  dtOptions: any = {};
  posts: Registration[] = [];
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  editable: boolean | undefined;
  subjectList: Observable<Subjects[]> = new Observable();
  List: SyllabusSubjectDetails[] = [];
  editIndex: number = -1;

  formGroup = new FormGroup({
    standard: new FormControl(),
    academicYearCode: new FormControl(),
    syllabusDetails: new FormControl()
  });

  syllabusSubjectFormGroup = new FormGroup({
    subject: new FormControl(),
    fa1: new FormControl(),
    fa2: new FormControl(),
    sa1: new FormControl(),
    fa3: new FormControl(),
    fa4: new FormControl(),
    sa2: new FormControl()
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
    private subjectService: SubjectService,
    private syllabusService: SyllabusService
  ) {
  }

  //get student formcontroll
  get syllabusFormControll() {
    return this.formGroup.controls;
  }

  get syllabusSubjectFormControll() {
    return this.syllabusSubjectFormGroup.controls;
  }

  ngOnInit() {
    this.customInit();
    this.loadTable();
  }

  customInit() {
    this.createStudentForm(new Syllabus());
    this.createSyllabusRow(new SyllabusSubjectDetails());

    this.updateEditable();
    this.loadClass();
    this.loadAcademicyear();
    this.loadSubject();
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createStudentForm(syllabus: Syllabus) {
    this.formGroup = this.formBuilder.group({
      standard: [syllabus.standard],
      academicYearCode: [syllabus.academicYearCode,[Validators.required]],
      syllabusDetails: [syllabus.syllabusSubjectDetails,[]]
    });
  }


createSyllabusRow(syllabusSubjectDetails: SyllabusSubjectDetails){
   this.syllabusSubjectFormGroup = this.formBuilder.group({
    subject: [syllabusSubjectDetails.subject, Validators.required],
    fa1: [syllabusSubjectDetails.fa1, Validators.required],
    fa2: [syllabusSubjectDetails.fa2, Validators.required],
    sa1: [syllabusSubjectDetails.sa1, Validators.required],
    fa3: [syllabusSubjectDetails.fa3, Validators.required],
    fa4: [syllabusSubjectDetails.fa4, Validators.required],
    sa2: [syllabusSubjectDetails.sa2, Validators.required]
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

  loadSubject() {
    this.subjectList = this.subjectService.getAllActiveSubject().pipe(
      map((res) => {
        return res.data;
      })
    )
  }


  //load the table
  loadTable() {
    this.dtOptions = {
      processing: true,
      scrollY: "300px",
      scrollCollapse: true,
      fixedColumns: {
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
    studentInfo.academicYearCode = this.syllabusFormControll.academicYearCode.value;
    studentInfo.standard = this.syllabusFormControll.standard.value;

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
    const url = appurl.navmenu + appurl.menuurl_student + appurl.student_registration;
    const encryptData = this.authService.getEncryptText(JSON.stringify(stuDetails));
    this.router.navigate([url], {
      state: {data: JSON.stringify(encryptData)}
    });
  }


resetForm() {
    this.createStudentForm(new Syllabus())
    this.posts = [];
}

editSyllabus(index: number) {

  this.editIndex = index;
  const item = this.List[index];
  this.syllabusSubjectFormGroup.patchValue({
    subject: item.subject,
    fa1: item.fa1,
    fa2: item.fa2,
    sa1: item.sa1,
    fa3: item.fa3,
    fa4: item.fa4,
    sa2: item.sa2
  });
}

removeSyllabus(index: number) {

  this.List.splice(index, 1);

  if (this.editIndex === index) {
    this.editIndex = -1;
  }
}

addSyllabus() {
  const duplicate = this.checkDuplicateSubject(this.syllabusSubjectFormGroup.value.subject, this.List, this.editIndex);
  if (duplicate) {
    this.sweetAlertService.showAlert(msgTypes.WARNING, "Subject already exists.", msgTypes.WARNING, msgTypes.OK_KEY);
    return;
  }
  const syllabus = new SyllabusSubjectDetails();
  syllabus.subject = this.syllabusSubjectFormGroup.value.subject;
  syllabus.fa1 = this.syllabusSubjectFormGroup.value.fa1;
  syllabus.fa2 = this.syllabusSubjectFormGroup.value.fa2;
  syllabus.sa1 = this.syllabusSubjectFormGroup.value.sa1;
  syllabus.fa3 = this.syllabusSubjectFormGroup.value.fa3;
  syllabus.fa4 = this.syllabusSubjectFormGroup.value.fa4;
  syllabus.sa2 = this.syllabusSubjectFormGroup.value.sa2;
  if (this.editIndex > -1) {
    this.List[this.editIndex] = syllabus;
    this.editIndex = -1;
  } else {
    this.List.push(syllabus);
  }
  this.clearSyllabusForm();
}

checkDuplicateSubject(subject: string, list: SyllabusSubjectDetails[], editIndex: number): boolean {
  return list.some((item, index) => item.subject === subject && index !== editIndex);
}

clearSyllabusForm() {
    this.syllabusSubjectFormGroup.reset();
}


finalSubmit() {
  if (this.List.length === 0) {
    this.sweetAlertService.showAlert(msgTypes.WARNING, "Please add at least one subject to the syllabus.", msgTypes.WARNING, msgTypes.OK_KEY);
    return;
  }
  const syllabus = new Syllabus();
  syllabus.standard = this.syllabusFormControll.standard.value;
  syllabus.academicYearCode = this.syllabusFormControll.academicYearCode.value;
  syllabus.syllabusSubjectDetails = this.List;

  this.syllabusService.insertSyllabus(syllabus).subscribe(res => {
    if (res.status === msgTypes.SUCCESS_MESSAGE) {
      this.sweetAlertService.showAlert(msgTypes.SUCCESS, "Syllabus submitted successfully!", msgTypes.SUCCESS, msgTypes.OK_KEY);
      // Optionally, you can reset the form and clear the list after submission.
      this.resetForm();
      this.List = [];
    } else {
      this.sweetAlertService.showAlert(msgTypes.ERROR, res.message, msgTypes.ERROR, msgTypes.OK_KEY);
    }
  }, error => {
    this.sweetAlertService.showAlert(msgTypes.ERROR, "An error occurred while submitting the syllabus. Please try again.", msgTypes.ERROR, msgTypes.OK_KEY);
  });
}

}
