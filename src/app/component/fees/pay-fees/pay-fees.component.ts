import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, map } from 'rxjs';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Fees } from 'src/app/model/fees/fees.model';
import { StudentFeesStructure } from 'src/app/model/fees/student-fees-structure.model';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { FeesService } from 'src/app/service/fees/fees.service';
import { StudentFeesStructureService } from 'src/app/service/fees/student-fees-structure.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { RegistrationService } from 'src/app/service/student/registration.service';
import { CustomValidation } from 'src/app/validators/customValidation';
import { FeesReceiptComponent } from '../fees-receipt/fees-receipt.component';
import * as moment from 'moment';

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
  studentFeeStructure: StudentFeesStructure = new StudentFeesStructure();
  feesModel: Fees = new Fees();
  formgroup: FormGroup;
  callBylinkFlag: boolean = true;
  discountChanged: boolean = false;
  previewReceiptFlag: boolean = true;
  maxDate = new Date(); 
  //set min date value in onInit function
  minDate = new Date();
  abc = {"name":'',"contact":''}
  parentDetails:any []=[];
  studentDetails: Registration = new Registration();
  feesData: Fees[] = [];
  
  

  // lumpsumButtonFlag: boolean = true;
  // isLumpsum: boolean =  false;

  totalAmount: number = 0;
  totalDiscount: number = 0;
  totalAmountAfterDiscount: number = 0;
  //totalAmountpaid: number = 0;
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
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private studentFeesStructureService: StudentFeesStructureService,
    private alertService: SweetAlertService,
    public dialog: MatDialog
  ) {
  }

  //load ngOnInit
  ngOnInit() {
    const fees = new Fees();
    //fees.paymentDate = new Date();
    this.createFeesForm(fees);
    this.customInit();

    this.minDate.setDate(this.minDate.getDate() - 3);
  }

  createFeesForm(fees: Fees) {
    this.formgroup = this.formBuilder.group({
      classCode: ['', [Validators.required]],
      academicYearCode: ['', [Validators.required]],
      registrationNo: ['', [Validators.required]],

     // amount: [fees.amount, [Validators.required, CustomValidation.numeric]],
      amount: [fees.amount, [Validators.required]],
      paymenttype: [fees.paymenttype,[]],
      paymentMode: [fees.paymentMode, [Validators.required]],
      paymentDate: [new Date(), [Validators.required]],
      paymentReceivedBy: [fees.paymentReceivedBy, []],
      remarks: [fees.remarks, [CustomValidation.alphanumaricSpace]],

      regAndAnnualFees: [''],
      regPreviousDiscount: [''],
      regFeesDiscount: ['', [CustomValidation.amountValidation]],
      regFeesDiscountReason: [''],
      regAmountAfterDiscount: [''],
      regAmountPaid: [''],
      regNetPayable: [''],


      studentFeesInstallment: new FormArray([])
    });
  }

  async customInit() {
    this.callParam();
    this.loadClass();
    this.loadAcademicyear();
  }

  async callParam() {
    this.route.queryParams.subscribe((params) => {
          if(params.data!=undefined){
          const txndata = JSON.parse(params.data);
          const decryptedData = this.authService.getDecryptText(txndata);
          const data = JSON.parse(decryptedData);
          this.callBylinkFlag = false;

          //To open the selected student fees details
          this.feesFormControll.academicYearCode.setValue(data.academicYearCode);
          this.feesFormControll.classCode.setValue(data.standard);
          this.feesFormControll.registrationNo.setValue(data.registrationNo);
          this.getFeesDetails();
      }

    })
  }

  loadClass() {
    this.allClassList = this.classService.getAllActiveClass();
  };

  loadAcademicyear() {
    this.academicYearList = this.academicYearService.getAllActiveAcademicYear();
  };

  loadStudentList() {
    this.studentList = new Observable();
    this.feesFormControll.registrationNo.reset();
    const reg = new Registration();
    reg.academicYearCode = this.feesFormControll.academicYearCode.value;
    reg.standard = this.feesFormControll.classCode.value;
    this.studentList = this.registrationService.studentList(reg);
  }

  academicYearChange(){
    this.feesFormControll.registrationNo.reset();
    this.feesFormControll.classCode.reset();
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
      this.feesData = res.data;
      if(res.data.length>0){
        this.previewReceiptFlag = false;
      }
      for (let i = 0; i < res.data.length; i++) {
        this.feesPaid = this.feesPaid + res.data[i].amount
      }
      this.amountPaidTillDate = this.feesPaid;
      const control = <FormArray>this.formgroup.controls['studentFeesInstallment'];
      this.clearFormArray(control);
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
      this.prepareParentDetails(res.data[0]);
      this.studentDetails = res.data[0];
      const feeStructure = res.data[0].studentFeesStructure[0];
      //store to update discounts
      this.studentFeeStructure = feeStructure;
      const installment = feeStructure.studentFeesInstallment;


      this.feesFormControll.regAndAnnualFees.setValue((feeStructure.annualFees + feeStructure.registrationFees));
      this.feesFormControll.regPreviousDiscount.setValue(feeStructure.discountAmount);
      this.feesFormControll.regFeesDiscount.setValue(feeStructure.regFeesDiscount);
      this.feesFormControll.regFeesDiscountReason.setValue(feeStructure.regFeesDiscountReason);
      const regAmountAfterDiscount = ((feeStructure.annualFees + feeStructure.registrationFees) - feeStructure.discountAmount) - feeStructure.regFeesDiscount;
      this.feesFormControll.regAmountAfterDiscount.setValue(regAmountAfterDiscount);

      this.totalNetPayable = 0;
      this.termFees = 0;
      this.termFeesPendingAmount = 0;
      this.totalIndividualDiscount = 0;

      if (this.feesPaid > regAmountAfterDiscount) {
        this.feesFormControll.regAmountPaid.setValue(regAmountAfterDiscount);
        this.feesFormControll.regNetPayable.setValue(0);
        this.feesPaid = this.feesPaid - regAmountAfterDiscount;
        this.regPendingFees = 0;
        this.totalNetPayable += 0;

      } else {
        this.feesFormControll.regAmountPaid.setValue(this.feesPaid);
        this.feesFormControll.regNetPayable.setValue(regAmountAfterDiscount - this.feesPaid);
        this.totalNetPayable += (regAmountAfterDiscount - this.feesPaid);
        this.regPendingFees = regAmountAfterDiscount - this.feesPaid;
        this.feesPaid = 0;

      }
      
      this.totalIndividualDiscount = Number(feeStructure.regFeesDiscount);
      this.totalAmount = (Number(feeStructure.annualFees) + Number(feeStructure.registrationFees));
      this.totalAmountAfterDiscount = (Number(this.totalAmount) - Number(feeStructure.discountAmount))
      const control = <FormArray>this.formgroup.controls['studentFeesInstallment'];
      for (let i = 0; i < installment.length; i++) {

        this.totalAmount += installment[i].installmentAmount;
        this.totalAmountAfterDiscount += (installment[i].installmentAmount - installment[i].discountAmount);
        this.totalIndividualDiscount += Number(installment[i].discountAmount);

        let installmentPaidAmount = 0;
        if (this.feesPaid > (installment[i].installmentAmount - installment[i].discountAmount)) {
          installmentPaidAmount = installment[i].installmentAmount - installment[i].discountAmount;
          this.feesPaid = this.feesPaid - installmentPaidAmount;
        } else {
          installmentPaidAmount = this.feesPaid;
          this.feesPaid = 0;
        }
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


  prepareParentDetails(registartion: Registration){
    this.parentDetails = [];
    this.parentDetails.push({"name":registartion.fatherName, "contact":registartion.fatherContactNo});
    this.parentDetails.push({"name":registartion.motherName, "contact":registartion.motherContactNumber});
  }
  resetForm() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  get studentInstallmentFormGroups() {
    return this.formgroup.get('studentFeesInstallment') as FormArray
  }

  async save() {
    console.log("totalAmountAfterDiscount",this.totalAmountAfterDiscount);
    console.log("this.amountPaidTillDate", this.amountPaidTillDate);
    console.log("this.feesModel.amount",this.feesFormControll.amount.value);
    
    
    
    if(this.totalAmountAfterDiscount>=(Number(this.amountPaidTillDate) + Number(this.feesFormControll.amount.value))){
          this.feesModel = { ...this.feesModel, ...this.formgroup.value }
          this.feesModel.paymentDate = moment(this.feesModel.paymentDate).format(msgTypes.YYYY_MM_DD);
          try {
            this.feesService.insertFees(this.feesModel).subscribe(res => {
              if (res.status === msgTypes.SUCCESS_MESSAGE){
                  this.studentDetails.paidFees = (Number(this.amountPaidTillDate) + Number(this.feesModel.amount));
                  this.studentDetails.pendingFees = (Number(this.totalNetPayable) - Number(this.feesModel.amount));
                  this.studentDetails.totalFees = this.totalAmountAfterDiscount;
                  if(this.studentDetails.pendingFees===0){
                    this.studentDetails.isTotalFeesPaid = true;
                  }else{
                    this.studentDetails.isTotalFeesPaid = false;
                  }
                  this.registrationService.updateFeesDetails(this.studentDetails).subscribe(res=>{
                    if (res.status === msgTypes.SUCCESS_MESSAGE){
                      this.feesFormControll.amount.reset();
                      this.feesFormControll.paymentMode.reset();
                      this.feesFormControll.remarks.reset();
                      this.getFeesDetails();
                    }
                  });
              }
            });
          } catch (error) { }
      }else{
        this.sweetAlertService.showAlert("Amount Exceed", "Paid Amount is more than Total Fees", msgTypes.ERROR, msgTypes.OK_KEY);
      }
  }

  onRegFeesDiscountChange() {
    this.discountChanged = true;

    const regAndAnnualFees = this.feesFormControll.regAndAnnualFees.value;
    const previousDiscount = this.feesFormControll.regPreviousDiscount.value;
    const regFeesDiscount = this.feesFormControll.regFeesDiscount.value;
    const regAmountPaid = this.feesFormControll.regAmountPaid.value;
    const amountAfterDiscount = ((regAndAnnualFees - previousDiscount) - regFeesDiscount);
   
    if (amountAfterDiscount<0) {
      this.feesFormControll.regFeesDiscount.setValue(0)
      this.feesFormControll.regAmountAfterDiscount.setValue((regAndAnnualFees - previousDiscount))
      this.feesFormControll.regNetPayable.setValue((regAndAnnualFees - previousDiscount) - regAmountPaid)
      this.sweetAlertService.showAlert("Invalid Discount", "Discount is greater then Installment Amount", msgTypes.ERROR, msgTypes.OK_KEY);
    } else if (regFeesDiscount < 0) {
      this.feesFormControll.regFeesDiscount.setValue(0)
      this.feesFormControll.regAmountAfterDiscount.setValue((regAndAnnualFees - previousDiscount))
      this.feesFormControll.regNetPayable.setValue((regAndAnnualFees - previousDiscount) - regAmountPaid)
      this.sweetAlertService.showAlert("Invalid Discount", "Discount should be a posetive number", msgTypes.ERROR, msgTypes.OK_KEY);
    } else {
      this.feesFormControll.regAmountAfterDiscount.setValue(amountAfterDiscount)
      this.feesFormControll.regNetPayable.setValue(amountAfterDiscount - regAmountPaid)
    }
    this.reCalculateTotal();
  }
  onDiscountReasonChange(){
    this.discountChanged = true;
  }

  onInstallmentDiscountChange(index: number) {
    this.discountChanged = true;

    const discount = this.formgroup.controls.studentFeesInstallment.value[index].discountAmount;
    const installmentAmount = this.formgroup.controls.studentFeesInstallment.value[index].installmentAmount;
    if (discount > installmentAmount) {
      this.studentInstallmentFormGroups.controls[index].get('discountAmount')?.setValue(0);
      this.sweetAlertService.showAlert("Invalid Discount", "Discount is greater then Installment Amount", msgTypes.ERROR, msgTypes.OK_KEY);
    } else if (discount < 0) {
      this.studentInstallmentFormGroups.controls[index].get('discountAmount')?.setValue(0);
      this.sweetAlertService.showAlert("Invalid Discount", "Discount should be a posetive number", msgTypes.ERROR, msgTypes.OK_KEY);
    }
    // else{
    //   this.termFees=this.termFees - discount;
    // }
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

  async updateFeeStructureDiscount() {
    // discount on registration fees 
    this.studentFeeStructure.regFeesDiscount = this.feesFormControll.regFeesDiscount.value;
    this.studentFeeStructure.regFeesDiscountReason = this.feesFormControll.regFeesDiscountReason.value;

    //discount on installment
    const control = <FormArray>this.formgroup.controls['studentFeesInstallment'];
    for (let i = 0; i < control.value.length; i++) {
      const installmentAmount = control.value[i].installmentAmount;
      const installmentDiscount = control.value[i].discountAmount;
      const discountReason = control.value[i].discountReason;
      const installmentDate = control.value[i].installmentDate;
      
      this.studentFeeStructure.studentFeesInstallment.map(installment=>{
        if(installment.installmentAmount === installmentAmount 
          && installment.installmentDate === installmentDate){
              installment.discountAmount = installmentDiscount;
              installment.discountReason = discountReason;
        }
      })
    }

    this.studentFeesStructureService.insertStudentFeesStructure(this.studentFeeStructure).subscribe(res=>{
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
            this.discountChanged = false;
            this.sweetAlertService.showAlert(msgTypes.SUCCESS_MESSAGE, msgTypes.STUDENT_FEES_STRUCTURE_UPDATED, msgTypes.SUCCESS, msgTypes.OK_KEY);
            this.getFeesDetails();
      }
    });

  }

  // lumpsumButtonClicked(){
  // this.isLumpsum = true;
  // }
  openDialog(){
    const dialogRef = this.dialog.open(FeesReceiptComponent, {
      data: [this.feesData, this.studentDetails],
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
