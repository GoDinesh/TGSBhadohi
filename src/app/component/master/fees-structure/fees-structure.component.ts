import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { DiscountReason } from 'src/app/model/master/discount-reason.model';
import { FeesStructure } from 'src/app/model/master/fees-structure.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { DiscountReasonService } from 'src/app/service/masters/discount-reason.service';
import { FeesStructureService } from 'src/app/service/masters/fees-structure.service';
import { CustomValidation } from 'src/app/validators/customValidation';
import * as moment from 'moment';

@Component({
  selector: 'app-fees-structure',
  templateUrl: './fees-structure.component.html',
  styleUrls: ['./fees-structure.component.css']
})
export class FeesStructureComponent {

  editable: boolean | undefined;
  trueFlag = true;
  actionFlag = true;
  dtOptions: any = {};
  Count = [];
  //totalInstallmentAmount: number = 0;
  installmentFlag: boolean = false;
  today = new Date();
  maxDate = new Date();
  minDate = new Date();

  installmentAmount: number = 0;
  installmentDiscount: number = 0;
  installmentAfterDiscount: number = 0;

  feesStructureModel: FeesStructure = new FeesStructure();
  posts: Observable<ResponseModel> = new Observable();
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  discountReasonList: Observable<DiscountReason[]> = new Observable();
  formgroup: FormGroup;


  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private classService: ClassService,
    private discountReasonService: DiscountReasonService,
    private academicYearService: AcademicYearService,
    private feesStructureService: FeesStructureService,
    private permissionService: PermissionService,
    private router: Router,
    private alertService: SweetAlertService,
  ) {
  }

  ngOnInit() {
    this.createForm(new FeesStructure());
    this.updateEditable();
    this.customInit();
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createForm(feeStructure: FeesStructure) {
    this.formgroup = this.formBuilder.group({
      feeStructureId: [feeStructure.feeStructureId],
      classCode: [feeStructure.classCode, [Validators.required]],
      academicYearCode: [feeStructure.academicYearCode, [Validators.required]],
      enrollmentType: [feeStructure.enrollmentType, [Validators.required]],
      noOfInstallments: [feeStructure.noOfInstallments, []],
      totalFees: [feeStructure.totalFees, [Validators.required, Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      discountReasonCode: [feeStructure.discountReasonCode],
      discountAmount: [feeStructure.discountAmount, [Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      netAmountAfterDiscount: [feeStructure.netAmountAfterDiscount],
      // registrationFees: [feeStructure.registrationFees,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      // annualFees: [feeStructure.annualFees,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      lumpsumAmount: [feeStructure.lumpsumAmount],
      // annualFeesDate: [feeStructure.annualFeesDate,[Validators.required]],
      regFeesDiscount: [feeStructure.regFeesDiscount],
      regFeesDiscountReason: [feeStructure.regFeesDiscountReason],
      installment: new FormArray([])


    })
  }

  addInstallment() {
    const control = <FormArray>this.formgroup.controls['installment'];
    if (control.length === 0) {
      control.push(
        new FormGroup({
          classCode: new FormControl(this.formgroup.controls.classCode.value),
          academicYearCode: new FormControl(this.formgroup.controls.academicYearCode.value),
          installmentNumber: new FormControl(control.length + 1),
          installmentType: new FormControl('Registration Fees'),
          installmentAmount: new FormControl(),
          installmentDiscount: new FormControl(),
          installmentDate: new FormControl(),
          installmentAmountAfterDiscount: new FormControl(),
        })
      )

      control.push(
        new FormGroup({
          classCode: new FormControl(this.formgroup.controls.classCode.value),
          academicYearCode: new FormControl(this.formgroup.controls.academicYearCode.value),
          installmentNumber: new FormControl(control.length + 1),
          installmentType: new FormControl('Annual Fees'),
          installmentAmount: new FormControl(),
          installmentDiscount: new FormControl(),
          installmentDate: new FormControl(),
          installmentAmountAfterDiscount: new FormControl(),
        })
      )
    } else {
      control.push(
        new FormGroup({
          classCode: new FormControl(this.formgroup.controls.classCode.value),
          academicYearCode: new FormControl(this.formgroup.controls.academicYearCode.value),
          installmentNumber: new FormControl(control.length + 1),
          installmentType: new FormControl('Installment'),
          installmentAmount: new FormControl(),
          installmentDiscount: new FormControl(),
          installmentDate: new FormControl(),
          installmentAmountAfterDiscount: new FormControl(),
        })
      )
    }
  }

  removeInstallment(index: number) {
    const control = <FormArray>this.formgroup.controls['installment'];
    control.removeAt(index)
    if (this.installmentAmount > 0) {
      this.installmentAmountChange()
    }
  }

  get installmentFormGroups() {
    return this.formgroup.get('installment') as FormArray
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
      ]
    };
  }


  customInit() {
    this.loadTable();
    this.getTableRecord();
    this.loadClass();
    this.loadDiscountReason();
    this.loadAcademicyear();
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

  loadDiscountReason() {
    this.discountReasonList = this.discountReasonService.getAllActiveDiscountReason().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  get formControll() {
    return this.formgroup.controls;
  }

  async save() {
    const flag = await this.validateAllInstallmentrecord();
    if (flag) {
      this.feesStructureModel = { ...this.feesStructureModel, ...this.formgroup.value }
      this.feesStructureModel.installment.map(installment => {
        installment.installmentDate = moment(installment.installmentDate).format(msgTypes.YYYY_MM_DD);
      })
      this.feesStructureModel.discountAmount = this.installmentDiscount;
      this.feesStructureModel.netAmountAfterDiscount = this.installmentAfterDiscount;
      this.feesStructureModel.noOfInstallments = this.feesStructureModel.installment.length;
      //this.feesStructureModel.annualFeesDate = moment(this.feesStructureModel.annualFeesDate).format(msgTypes.YYYY_MM_DD);
      try {
        this.feesStructureService.insertFeesStructure(this.feesStructureModel).subscribe(res => {
          if (res.status === msgTypes.SUCCESS_MESSAGE) {
            this.getTableRecord();
            this.resetForm();
          }
        });
      } catch (error) { }
    }
  }

  async validateAllInstallmentrecord() {
    let flag = true;
    const control = <FormArray>this.formgroup.controls['installment'];
    for (let i = 0; i < control.value.length; i++) {
      const installmentDate = control.value[i].installmentDate;
      if (installmentDate === null) {
        flag = false;
        this.alertService.showAlert(msgTypes.ERROR, "Installment date should not be blank", msgTypes.ERROR, msgTypes.OK_KEY)
        break;
      }
    }
    return flag;
  }

  getTableRecord() {
    this.posts = this.feesStructureService.getAllFeesStructure();
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: FeesStructure) {
    const flag = await this.alertService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.feesStructureService.insertFeesStructure(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }

  //set value in formfield to update
  setValueToUpdate(data: FeesStructure) {
    this.createForm(data);
    const installment = data.installment;
    const control = <FormArray>this.formgroup.controls['installment'];
    for (let i = 0; i < installment.length; i++) {
      control.push(
        new FormGroup({
          classCode: new FormControl(installment[i].classCode),
          academicYearCode: new FormControl(installment[i].academicYearCode),
          installmentNumber: new FormControl(installment[i].installmentNumber),
          installmentType: new FormControl(installment[i].installmentType),
          installmentAmount: new FormControl(installment[i].installmentAmount),
          installmentDiscount: new FormControl(installment[i].installmentDiscount),
          installmentDate: new FormControl(installment[i].installmentDate),
          installmentAmountAfterDiscount: new FormControl(installment[i].installmentAmountAfterDiscount),
        })
      )

      this.installmentAmountChange();
    }

    this.actionFlag = false;
  }

  //update the record
  // update() {
  //   this.feesStructureModel = { ...this.feesStructureModel, ...this.formgroup.value }
  //   this.feesStructureService.insertFeesStructure(this.feesStructureModel).subscribe((res) => {
  //     if (res.status === msgTypes.SUCCESS_MESSAGE) {
  //       this.getTableRecord();
  //       this.resetForm();
  //     }
  //   });
  // }


  resetForm() {
    this.createForm(new FeesStructure())
    this.installmentFlag = false;
    //this.totalInstallmentAmount =0 ;
    this.installmentAmount = 0;
    this.installmentDiscount = 0;
    this.installmentAfterDiscount = 0;
  }

  totalFeesChange() {
    let totalFees = (this.formControll.totalFees.value);
    if (totalFees.NaN) {
      totalFees = 0;
    }

    let discountAmount = this.formControll.discountAmount.value;
    if (discountAmount.NaN) {
      discountAmount = 0;
    }

    this.formControll.netAmountAfterDiscount.setValue((Number(totalFees) - Number(discountAmount)));
    this.formControll.lumpsumAmount.setValue((Number(totalFees) - Number(discountAmount)));

    const control = <FormArray>this.formgroup.controls['installment'];
    if (control.length > 0) {
      this.installmentAmountChange();
    }

    // this.totalInstallmentAmount=(this.formControll.totalFees.value-this.formControll.discountAmount.value-this.formControll.registrationFees.value-this.formControll.annualFees.value)
  }

  get studentInstallmentFormGroups() {
    return this.formgroup.get('installment') as FormArray
  }

  installmentAmountChange() {
    this.installmentAmount = 0;
    this.installmentDiscount = 0;
    this.installmentAfterDiscount = 0;


    const control = <FormArray>this.formgroup.controls['installment'];
    for (let i = 0; i < control.value.length; i++) {
      const inst = Number(control.value[i].installmentAmount);
      const disc = Number(control.value[i].installmentDiscount);
      this.studentInstallmentFormGroups.controls[i].get('installmentAmountAfterDiscount')?.setValue(inst - disc);
      this.installmentAfterDiscount += Number(control.value[i].installmentAmountAfterDiscount);
      this.installmentAmount += inst;
      this.installmentDiscount += disc;
    }

    if (this.installmentAmount === Number(this.formControll.totalFees.value)
      // && this.installmentDiscount===Number(this.formControll.discountAmount.value)
      //  && this.installmentAfterDiscount === Number(this.formControll.netAmountAfterDiscount.value)
    ) {
      this.installmentFlag = true;
    } else {
      this.installmentFlag = false;
    }
  }

  academicYearChange() {
    const academicYear = this.formgroup.controls.academicYearCode.value;
    const year1 = ("" + academicYear).substring(0, 4);
    const year2 = ("" + academicYear).substring(4, 8);
    this.minDate = new Date(year1 + "-04-01");
    this.maxDate = new Date(year2 + "-03-31");
  }

  installmentDateChange(index: number) {
    if (index > 0) {
      const control = <FormArray>this.formgroup.controls['installment'];
      for (let i = 0; i < control.value.length; i++) {
        const instDate = new Date(control.value[i].installmentDate);
        const selectedDate = new Date(control.value[index].installmentDate);
        if (selectedDate.getTime() < instDate.getTime()) {
          this.alertService.showAlert(msgTypes.ERROR_MESSAGE, "Installment date should be greater than previous entered date", msgTypes.ERROR, msgTypes.OK_KEY)
        }
      }
    }
  }

}
