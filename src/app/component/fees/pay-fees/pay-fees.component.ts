import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Observable, map } from 'rxjs';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Fees } from 'src/app/model/fees/fees.model';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { FeesService } from 'src/app/service/fees/fees.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { RegistrationService } from 'src/app/service/student/registration.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-pay-fees',
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent {
  allClassList: Observable<ResponseModel> = new Observable();
  academicYearList: Observable<ResponseModel> = new Observable();
  studentList: Observable<ResponseModel> = new Observable();
  registrationModel: Observable<ResponseModel> = new Observable();
  feesModel: Fees = new Fees();
  formgroup: FormGroup;

  totalAmount: number = 0;
  totalDiscount: number = 0;
  totalAmountAfterDiscount: number = 0;
  totalAmountpaid: number = 0;
  totalNetPayable: number = 0;
  totalIndividualDiscount: number = 0;

  feesPaid: number = 0;
  amountPaidTillDate: number = 0;
  termFees: number = 0;
  termFeesPendingAmount: number = 0;
  regPendingFees: number = 0;

  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private classService: ClassService,
    private academicYearService: AcademicYearService,
    private registrationService: RegistrationService,
    private feesService: FeesService,
    private sweetAlertService: SweetAlertService,
  ) {
  }

  //load ngOnInit
  ngOnInit() {
    this.createFeesForm(new Fees());
    this.customInit();

  }

  createFeesForm(fees: Fees) {
    this.formgroup = this.formBuilder.group({
      classCode: ['', [Validators.required]],
      academicYearCode: ['', [Validators.required]],
      registrationNo: ['', [Validators.required]],

      amount: [fees.amount, [Validators.required, CustomValidation.amountValidation]],
      paymentMode: [fees.paymentMode, [Validators.required]],
      paymentDate: [fees.paymentDate, [Validators.required]],
      paymentReceivedBy: [fees.paymentReceivedBy, []],

      regAndAnnualFees: [''],
      regPreviousDiscount: [''],
      regFeesDiscount: [''],
      regFeesDiscountReason: [''],
      regAmountAfterDiscount: [''],
      regAmountPaid: [''],
      regNetPayable: [''],


      studentFeesInstallment: new FormArray([])
    });
  }

  async customInit() {
    this.loadClass();
    this.loadAcademicyear();
  }

  loadClass() {
    this.allClassList = this.classService.getAllClass();
  };

  loadAcademicyear() {
    this.academicYearList = this.academicYearService.getAllAcademicYear();
  };

  loadStudentList() {
    this.studentList = new Observable();
    const reg = new Registration();
    reg.academicYearCode = this.feesFormControll.academicYearCode.value;
    reg.standard = this.feesFormControll.classCode.value;
    this.studentList = this.registrationService.studentList(reg);
  }

  //get fees formcontroll
  get feesFormControll() {
    return this.formgroup.controls;
  }

  async getFeesDetails() {
    const feesModel = new Fees();
    feesModel.academicYearCode = this.feesFormControll.academicYearCode.value;
    feesModel.classCode = this.feesFormControll.classCode.value;
    feesModel.registrationNo = this.feesFormControll.registrationNo.value;

    this.feesService.getPaidFeesOfStudent(feesModel).subscribe(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.feesPaid = this.feesPaid + res.data[i].amount
      }
      this.amountPaidTillDate = this.feesPaid;
      this.displayFeesDetails();
    });
  }

  displayFeesDetails() {
    //this.feesFormControll.studentFeesInstallment.setValue(new FormArray([])) 

    const registration: Registration = new Registration();
    registration.academicYearCode = this.feesFormControll.academicYearCode.value;
    registration.standard = this.feesFormControll.classCode.value;
    registration.registrationNo = this.feesFormControll.registrationNo.value;
    this.registrationModel = this.registrationService.studentList(registration);
    this.registrationModel.subscribe(res => {
      const feeStructure = res.data[0].studentFeesStructure[0];
      const installment = feeStructure.studentFeesInstallment;


      this.feesFormControll.regAndAnnualFees.setValue((feeStructure.annualFees + feeStructure.registrationFees));
      this.feesFormControll.regPreviousDiscount.setValue(feeStructure.discountAmount);
      this.feesFormControll.regFeesDiscount.setValue(feeStructure.regFeesDiscount);
      this.feesFormControll.regFeesDiscountReason.setValue(feeStructure.regFeesDiscountReason);
      const regAmountAfterDiscount = ((feeStructure.annualFees + feeStructure.registrationFees) - feeStructure.discountAmount) - feeStructure.regFeesDiscount;
      this.feesFormControll.regAmountAfterDiscount.setValue(regAmountAfterDiscount);

      if (this.feesPaid > regAmountAfterDiscount) {
        this.feesFormControll.regAmountPaid.setValue(regAmountAfterDiscount);
        this.feesFormControll.regNetPayable.setValue(0);
        this.feesPaid = this.feesPaid - regAmountAfterDiscount;
        this.totalAmountpaid += regAmountAfterDiscount
        this.regPendingFees = 0;
        this.totalNetPayable += 0;
        
      } else {
        this.feesFormControll.regAmountPaid.setValue(this.feesPaid);
        this.feesFormControll.regNetPayable.setValue(regAmountAfterDiscount - this.feesPaid);
        this.totalAmountpaid += this.feesPaid
        this.totalNetPayable += (regAmountAfterDiscount - this.feesPaid);
        this.regPendingFees = regAmountAfterDiscount - this.feesPaid;
        this.feesPaid = 0;
        
      }


      this.totalAmount = (Number(feeStructure.annualFees) + Number(feeStructure.registrationFees));
      this.totalAmountAfterDiscount = (Number(this.totalAmount) - Number(feeStructure.discountAmount))
      const control = <FormArray>this.formgroup.controls['studentFeesInstallment'];
      for (let i = 0; i < installment.length; i++) {

        this.totalAmount += installment[i].installmentAmount;
        this.totalAmountAfterDiscount += (installment[i].installmentAmount - installment[i].discountAmount);

        let installmentPaidAmount = 0;
        if (this.feesPaid > installment[i].installmentAmount) {
          installmentPaidAmount = installment[i].installmentAmount - installment[i].discountAmount;
          this.feesPaid = this.feesPaid - installment[i].installmentAmount;
        } else {
          installmentPaidAmount = this.feesPaid;
          this.feesPaid = 0;
        }
        this.totalAmountpaid = this.totalAmountpaid + installmentPaidAmount;
        const payable = (installment[i].installmentAmount - installment[i].discountAmount) - installmentPaidAmount;
        this.totalNetPayable = this.totalNetPayable + payable;
        this.termFees += installment[i].installmentAmount;
        this.termFeesPendingAmount += payable;
        control.push(
          new FormGroup({
            classCode: new FormControl(installment[i].classCode),
            academicYearCode: new FormControl(installment[i].academicYearCode),
            installmentNumber: new FormControl((Number(installment[i].installmentNumber) + 1)),
            installmentDate: new FormControl(installment[i].installmentDate),
            installmentAmount: new FormControl(installment[i].installmentAmount),
            discountAmount: new FormControl(installment[i].discountAmount),
            discountReason: new FormControl(installment[i].discountReason),
            amountAfterDiscount: new FormControl((installment[i].installmentAmount - installment[i].discountAmount)),
            amountPaid: new FormControl(installmentPaidAmount),
            netPayable: new FormControl((installment[i].installmentAmount - installment[i].discountAmount) - installmentPaidAmount)
          })
        )
      }
    })
  }

  resetForm() {
    this.createFeesForm(new Fees())
  }

  get studentInstallmentFormGroups() {
    return this.formgroup.get('studentFeesInstallment') as FormArray
  }

  save() {
    this.feesModel = { ...this.feesModel, ...this.formgroup.value }
    try {
      this.feesService.insertFees(this.feesModel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE)
          this.getFeesDetails();
          this.displayFeesDetails();
          this.resetForm();
      });
    } catch (error) { }
  }

  onRegFeesDiscountChange() {
    const regAndAnnualFees = this.feesFormControll.regAndAnnualFees.value;
    const previousDiscount = this.feesFormControll.regPreviousDiscount.value;
    const regFeesDiscount = this.feesFormControll.regFeesDiscount.value;
    const regAmountPaid = this.feesFormControll.regAmountPaid.value;
    const amountAfterDiscount = ((regAndAnnualFees - previousDiscount) - regFeesDiscount);

    this.feesFormControll.regAmountAfterDiscount.setValue(amountAfterDiscount)
    this.feesFormControll.regNetPayable.setValue(amountAfterDiscount - regAmountPaid)

    this.reCalculateTotal();
  }

  onInstallmentDiscountChange(index: number) {
    const discount = this.formgroup.controls.studentFeesInstallment.value[index].discountAmount;
    const installmentAmount = this.formgroup.controls.studentFeesInstallment.value[index].installmentAmount;
    if (discount > installmentAmount) {
      this.studentInstallmentFormGroups.controls[index].get('discountAmount')?.setValue(0);
      this.sweetAlertService.showAlert("Invalid Discount", "Discount is greater then Installment Amount", msgTypes.ERROR, msgTypes.OK_KEY);
    } else if (discount < 0) {
      this.studentInstallmentFormGroups.controls[index].get('discountAmount')?.setValue(0);
      this.sweetAlertService.showAlert("Invalid Discount", "Discount should be a posetive number", msgTypes.ERROR, msgTypes.OK_KEY);
    }
    this.reCalculateTotal();
  }

  reCalculateTotal() {

    this.totalAmountAfterDiscount = this.feesFormControll.regAmountAfterDiscount.value;
    this.totalNetPayable = this.feesFormControll.regNetPayable.value;
    this.totalIndividualDiscount = Number(this.feesFormControll.regFeesDiscount.value);


    const control = <FormArray>this.formgroup.controls['studentFeesInstallment'];
    for (let i = 0; i < control.value.length; i++) {
      const afterDiscount = (control.value[i].installmentAmount - control.value[i].discountAmount);
      const netPayable = afterDiscount - control.value[i].amountPaid
      this.studentInstallmentFormGroups.controls[i].get('netPayable')?.setValue(netPayable);
      this.studentInstallmentFormGroups.controls[i].get('amountAfterDiscount')?.setValue(afterDiscount);
      this.totalAmountAfterDiscount += control.value[i].amountAfterDiscount
      this.totalNetPayable += control.value[i].amountAfterDiscount - control.value[i].amountPaid
      this.totalIndividualDiscount += Number(control.value[i].discountAmount);
    }
  }
}
