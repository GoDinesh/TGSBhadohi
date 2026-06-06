import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Subjects } from 'src/app/model/master/subjects.model';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { SubjectService } from 'src/app/service/masters/subject.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {

  displayedColumns = ["sNo", "subjectCode", "subject", "active"];
  subjectmodel: Subjects = new Subjects();
  dataSource = new MatTableDataSource<Subjects>();
  dtOptions: any = {};
  posts: Observable<Subjects[]> = new Observable();
  actionFlag = true;
  editable: boolean | undefined;

  formgroup = new FormGroup({
    id: new FormControl(),
    subject: new FormControl(),
    active: new FormControl(),
  });

  //Constructor
  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private subjectService: SubjectService,
    private alertService: SweetAlertService,
    private permissionService: PermissionService,
    private router: Router) {
  }

  //load ngOnInit
  ngOnInit() {
    this.createForm(new Subjects());
    this.updateEditable();
    this.customInit();
    this.loadTable();
  }

  async customInit() {
    await this.getTableRecord();
  }

  changeInCapital(){
     this.formgroup.get('subject')?.valueChanges.subscribe(value => {
    if (value) {
      this.formgroup.get('subject')?.setValue(
        value.toUpperCase(),
        { emitEvent: false }
      );
    }
  });
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createForm(subject: Subjects) {
    this.formgroup = this.formBuilder.group({
      id: [subject.id],
      subject: [subject.subject, [Validators.required, CustomValidation.plainText]],
      active: [subject.active, [Validators.required]]
    });
  }

  //load the table
  loadTable() {
    this.dtOptions = {
      processing: true,
      scrollY: "300px",
      scrollCollapse: true,
      dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"lip><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ],
    };
  }

  //get formcontroll
  get formControll() {
    return this.formgroup.controls;
  }

  async getTableRecord() {
    this.posts = this.subjectService.getAllSubject().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  save() {
    this.subjectmodel = { ...this.subjectmodel, ...this.formgroup.value }
    try {
      this.subjectService.insertSubject(this.subjectmodel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE) {
          this.getTableRecord();
        }
        this.resetForm();
      });
    } catch (error) { }
  }

  resetForm() {
    this.createForm(new Subjects())
    this.actionFlag = true;
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: Subjects) {
    const flag = await this.alertService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.subjectService.insertSubject(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }

  //set value in formfield to update
  setValueToUpdate(data: Subjects) {
    this.createForm(data);
    this.actionFlag = false;
  }

  //update the record
  update() {
    this.subjectmodel = { ...this.subjectmodel, ...this.formgroup.value }
    this.subjectService.insertSubject(this.subjectmodel).subscribe((res) => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.getTableRecord();
        this.resetForm();
      }
    });
  }
}

