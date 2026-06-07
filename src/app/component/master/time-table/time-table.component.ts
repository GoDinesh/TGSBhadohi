import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { Subjects } from 'src/app/model/master/subjects.model';
import { TimeTableDetails } from 'src/app/model/master/time-table-details.model';
import { TimeTable } from 'src/app/model/master/time-table.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { SubjectService } from 'src/app/service/masters/subject.service';
import { TimeTableService } from 'src/app/service/masters/time-table.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent {
  weekDayList: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  studentInfo: Registration = new Registration();
  dataSource = new MatTableDataSource<Registration>();
  dtOptions: any = {};
  posts: Observable<TimeTable[]> = new Observable();
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  editable: boolean | undefined;
  subjectList: Observable<Subjects[]> = new Observable();
  List: TimeTableDetails[] = [];
  editIndex: number = -1;
  timeTablemodel: TimeTable = new TimeTable();
  actionFlag = true;

  formGroup = new FormGroup({
    timeTableId: new FormControl(),
    standard: new FormControl(),
    academicYearCode: new FormControl(),
    timeTableDetails: new FormControl()
  });

  timetableDetailsFormGroup = new FormGroup({
    day: new FormControl(),
    subject1: new FormControl(),
    subject2: new FormControl(),
    subject3: new FormControl(),
    subject4: new FormControl(),
    subject5: new FormControl(),
    subject6: new FormControl(),
    subject7: new FormControl(),
    subject8: new FormControl()
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
    private timeTableService: TimeTableService,
    private alertService: SweetAlertService
    ) {
  }

  get timeTableFormControll() {
    return this.formGroup.controls;
  }

  get timetableDetailsFormControll() {
    return this.timetableDetailsFormGroup.controls;
  }

  ngOnInit() {
    this.customInit();
    this.loadTable();
  }

  customInit() {
    this.createForm(new TimeTable());
    this.createTimeTableRow(new TimeTableDetails());

    this.updateEditable();
    this.loadClass();
    this.loadAcademicyear();
    this.loadSubject();
      this.getTableRecord();
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createForm(syllabus: TimeTable) {
    this.formGroup = this.formBuilder.group({
      timeTableId: [syllabus.timeTableId],
      standard: [syllabus.standard],
      academicYearCode: [syllabus.academicYearCode,[Validators.required]],
      timeTableDetails: [syllabus.timeTableDetails,[]]
    });
  }


createTimeTableRow(timetableDetails: TimeTableDetails){
   this.timetableDetailsFormGroup = this.formBuilder.group({
    day: [timetableDetails.day, Validators.required],
    subject1: [timetableDetails.subject1, Validators.required],
    subject2: [timetableDetails.subject2, Validators.required],
    subject3: [timetableDetails.subject3, Validators.required],
    subject4: [timetableDetails.subject4, Validators.required],
    subject5: [timetableDetails.subject5, Validators.required],
    subject6: [timetableDetails.subject6, Validators.required],
    subject7: [timetableDetails.subject7, Validators.required],
    subject8: [timetableDetails.subject8, Validators.required]
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
    this.posts = this.timeTableService.getAllTimeTable().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  setVlaueToUpdate(stuDetails: Registration) {
    const url = appurl.navmenu + appurl.menuurl_student + appurl.student_registration;
    const encryptData = this.authService.getEncryptText(JSON.stringify(stuDetails));
    this.router.navigate([url], {
      state: {data: JSON.stringify(encryptData)}
    });
  }


resetForm() {
    this.createForm(new TimeTable())
    this.actionFlag = true;
}

editTimeTableRow(index: number) {

  this.editIndex = index;
  const item = this.List[index];
  this.timetableDetailsFormGroup.patchValue({
    day: item.day,
    subject1: item.subject1,
    subject2: item.subject2,
    subject3: item.subject3,
    subject4: item.subject4,
    subject5: item.subject5,
    subject6: item.subject6,
    subject7: item.subject7,
    subject8: item.subject8
  });
}

removeTimeTableRow(index: number) {

  this.List.splice(index, 1);

  if (this.editIndex === index) {
    this.editIndex = -1;
  }
}

addTimeTableRow() {
  const duplicate = this.checkDuplicateSubject(this.timetableDetailsFormGroup.value.day, this.List, this.editIndex);
  if (duplicate) {
    this.sweetAlertService.showAlert(msgTypes.WARNING, "Day already exists.", msgTypes.WARNING, msgTypes.OK_KEY);
    return;
  }
  const timeTableDetails = new TimeTableDetails();
  timeTableDetails.day = this.timetableDetailsFormGroup.value.day;
  timeTableDetails.subject1 = this.timetableDetailsFormGroup.value.subject1;
  timeTableDetails.subject2 = this.timetableDetailsFormGroup.value.subject2;
  timeTableDetails.subject3 = this.timetableDetailsFormGroup.value.subject3;
  timeTableDetails.subject4 = this.timetableDetailsFormGroup.value.subject4;
  timeTableDetails.subject5 = this.timetableDetailsFormGroup.value.subject5;
  timeTableDetails.subject6 = this.timetableDetailsFormGroup.value.subject6;
  timeTableDetails.subject7 = this.timetableDetailsFormGroup.value.subject7;
  timeTableDetails.subject8 = this.timetableDetailsFormGroup.value.subject8;
  if (this.editIndex > -1) {
    this.List[this.editIndex] = timeTableDetails;
    this.editIndex = -1;
  } else {
    this.List.push(timeTableDetails);
  }
  this.clearTimeTableForm();
}

checkDuplicateSubject(subject: string, list: TimeTableDetails[], editIndex: number): boolean {
  return list.some((item, index) => item.day === subject && index !== editIndex);
}

clearTimeTableForm() {
    this.timetableDetailsFormGroup.reset();
}


finalSubmit() {
  if (this.List.length === 0) {
    this.sweetAlertService.showAlert(msgTypes.WARNING, "Please add at least one subject to the syllabus.", msgTypes.WARNING, msgTypes.OK_KEY);
    return;
  }
  const timeTable = new TimeTable();
  timeTable.timeTableId = this.timeTableFormControll.timeTableId.value;
  timeTable.standard = this.timeTableFormControll.standard.value;
  timeTable.academicYearCode = this.timeTableFormControll.academicYearCode.value;
  timeTable.timeTableDetails = this.List;

  this.timeTableService.insertTimeTable(timeTable).subscribe(res => {
    if (res.status === msgTypes.SUCCESS_MESSAGE) {
      this.sweetAlertService.showAlert(msgTypes.SUCCESS, "Time table submitted successfully!", msgTypes.SUCCESS, msgTypes.OK_KEY);
      // Optionally, you can reset the form and clear the list after submission.
      this.resetForm();
      this.List = [];
    } else {
      this.sweetAlertService.showAlert(msgTypes.ERROR, res.message, msgTypes.ERROR, msgTypes.OK_KEY);
    }
  }, error => {
    this.sweetAlertService.showAlert(msgTypes.ERROR, "An error occurred while submitting the time table. Please try again.", msgTypes.ERROR, msgTypes.OK_KEY);
  });
}




  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: TimeTable) {
    const flag = await this.alertService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.timeTableService.insertTimeTable(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }

  //set value in formfield to update
  setValueToUpdate(data: TimeTable) {
    this.createForm(data);
    this.List = data.timeTableDetails;
    this.actionFlag = false;
  }


}
