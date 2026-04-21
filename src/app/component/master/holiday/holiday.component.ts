import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Holiday } from 'src/app/model/master/holiday.model';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { HolidayService } from 'src/app/service/masters/holiday.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent {
  holidayType=[{type:"Festival Holiday"},{type:"National Holiday"},{type:"School Holiday"},{type:"Others"}]
  holidaymodel: Holiday = new Holiday();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  dataSource = new MatTableDataSource<Holiday>();
  dtOptions: any = {};
  posts: Observable<Holiday[]> = new Observable();
  actionFlag = true;
  editable: boolean | undefined;

  formgroup = new FormGroup({
    id: new FormControl(),
    academicYearCode: new FormControl(),
    name: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    type: new FormControl(),
    active: new FormControl(),
  });

  //Constructor
  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private holidayService: HolidayService,
    private alertService: SweetAlertService,
    private permissionService: PermissionService,
    private academicYearService: AcademicYearService,
    private router: Router) {
  }

  //load ngOnInit
  ngOnInit() {
    this.createForm(new Holiday());
    this.updateEditable();
    this.customInit();
    this.loadTable();
  }

  async customInit() {
    await this.getTableRecord();
    this.loadAcademicyear();
  }

  loadAcademicyear() {
    this.academicYearList = this.academicYearService.getAllActiveAcademicYear().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createForm(holiday: Holiday) {
    this.formgroup = this.formBuilder.group({
      id: [holiday.id],
      academicYearCode: [holiday.academicYearCode, [Validators.required, Validators.minLength(8), Validators.maxLength(8), CustomValidation.alphanumaric]],
      name: [holiday.name, [Validators.required, Validators.minLength(1), Validators.maxLength(50), CustomValidation.plainText]],
      startDate: [holiday.startDate, [Validators.required]],
      endDate: [holiday.endDate, [Validators.required]],
      type: [holiday.type, [Validators.required, Validators.minLength(1), Validators.maxLength(50), CustomValidation.plainText]],
      active: [holiday.active, [Validators.required]]
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
    this.posts = this.holidayService.getAllHoliday().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  save() {
    this.holidaymodel = { ...this.holidaymodel, ...this.formgroup.value }
    try {
      this.holidaymodel.startDate = moment(this.holidaymodel.startDate).format(msgTypes.YYYY_MM_DD);
      this.holidaymodel.endDate = moment(this.holidaymodel.endDate).format(msgTypes.YYYY_MM_DD);
      this.holidayService.insertHoliday(this.holidaymodel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE) {
          this.getTableRecord();
        }
        this.resetForm();
      });
    } catch (error) { }
  }

  resetForm() {
    this.createForm(new Holiday())
    this.actionFlag = true;
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: Holiday) {
    const flag = await this.alertService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.holidayService.insertHoliday(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }

  //set value in formfield to update
  setValueToUpdate(data: Holiday) {
    this.createForm(data);
    this.actionFlag = false;
  }

  //update the record
  update() {
    this.holidaymodel = { ...this.holidaymodel, ...this.formgroup.value }
    this.holidaymodel.startDate = moment(this.holidaymodel.startDate).format(msgTypes.YYYY_MM_DD);
    this.holidaymodel.endDate = moment(this.holidaymodel.endDate).format(msgTypes.YYYY_MM_DD);
    this.holidayService.insertHoliday(this.holidaymodel).subscribe((res) => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.getTableRecord();
        this.resetForm();
      }
    });
  }


}


