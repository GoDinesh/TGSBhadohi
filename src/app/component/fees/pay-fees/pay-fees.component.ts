import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Fees } from 'src/app/model/fees/fees.model';
import { StudentFeesStructure } from 'src/app/model/fees/student-fees-structure.model';
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
import { BookAndDressFeesService } from 'src/app/service/masters/book-and-dress-fees.service';
import { BookAndDressFees } from 'src/app/model/master/book-and-dress-fees.model';
import { ToWords } from 'to-words';
import { Class } from 'src/app/model/master/class.model';
import { AcademicYear } from 'src/app/model/master/academic-year.model';

@Component({
  selector: 'app-pay-fees',
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent {
 // allClassList: Observable<ResponseModel> = new Observable();
 // academicYearList: Observable<ResponseModel> = new Observable();
  studentList: Observable<ResponseModel> = new Observable();
  registrationModel: Observable<ResponseModel> = new Observable();
  studentFeeStructure: StudentFeesStructure = new StudentFeesStructure();
  classList: Class[] = [];
  academicyearList: AcademicYear[]=[];
  feesModel: Fees = new Fees();
  formgroup: FormGroup;
  callBylinkFlag: boolean = true;
  discountChanged: boolean = false;
  previewReceiptFlag: boolean = true;
  maxDate = new Date();
  //set min date value in onInit function
  minDate = new Date();
  abc = { "name": '', "contact": '' }
  parentDetails: any[] = [];
  studentDetails: Registration = new Registration();
  bookAndDressFeesModel: BookAndDressFees = new BookAndDressFees();
  feesData: Fees[] = [];

  totalAmount: number = 0;
  installmentDiscount: number = 0;
  totalDiscount: number = 0;
  totalAmountAfterDiscount: number = 0;
  totalNetPayable: number = 0;
  totalIndividualDiscount: number = 0;

  feesPaid: number = 0;
  bookFeesPaid: number = 0;
  dressFeesPaid: number = 0;
  payableBookFees: number = 0;
  //payableDressFees: number = 0;
  amountPaidTillDate: number = 0;
  termFees: number = 0;
  annualAndRegistrationFee: number = 0;
  termFeesPendingAmount: number = 0;
  regPendingFees: number = 0;

  receiptnumber: string = '0';
  toWords = new ToWords();

  @ViewChild('printAndSaveButton') printAndSaveButton: ElementRef<HTMLElement>;

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
    public dialog: MatDialog,
    private bookDressFeesService: BookAndDressFeesService
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

      amount: [fees.amount, [Validators.required]],
      paymenttype: [fees.paymenttype, []],
      paymentMode: [fees.paymentMode, [Validators.required]],
      paymentDate: [new Date(), [Validators.required]],
      paymentReceivedBy: [fees.paymentReceivedBy, []],
      remarks: [fees.remarks, [CustomValidation.alphanumaricSpace]],

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
      if (params.data != undefined) {
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
    this.classService.getAllActiveClass().subscribe(res=>{
      this.classList = res.data
    });
  };

  loadAcademicyear() {
     this.academicYearService.getAllActiveAcademicYear().subscribe(res=>{
      this.academicyearList= res.data;
     });
  };

  getFeesReceiptNumber() {
    this.feesService.getMaxReceiptNo().subscribe((res) => {
      console.log("receipt number"+res);
      
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.receiptnumber = res.data;
        this.payFees();
      }else{
        this.sweetAlertService.showAlert("Receipt Number", "Receipt Number not Generated", msgTypes.ERROR, msgTypes.OK_KEY);
      }
    })
  }

  loadStudentList() {
    this.studentList = new Observable();
    this.feesFormControll.registrationNo.reset();
    const reg = new Registration();
    reg.academicYearCode = this.feesFormControll.academicYearCode.value;
    reg.standard = this.feesFormControll.classCode.value;
    this.studentList = this.registrationService.studentList(reg);
  }

  academicYearChange() {
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

    this.bookFeesPaid = 0;
    this.dressFeesPaid = 0;

    this.feesService.getPaidFeesOfStudent(feesModel).subscribe(async (res) => {
      this.feesData = res.data;
      if (res.data.length > 0) {
        this.previewReceiptFlag = false;
      }
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].paymenttype === 'Fees') {
          this.feesPaid = this.feesPaid + res.data[i].amount;
        } else if (res.data[i].paymenttype === 'Book Fees') {
          this.bookFeesPaid += res.data[i].amount;
        } else if (res.data[i].paymenttype === 'Dress Fees') {
          this.dressFeesPaid += res.data[i].amount;
        }
      }

      this.amountPaidTillDate = this.feesPaid;
      const control = <FormArray>this.formgroup.controls['studentFeesInstallment'];
      this.clearFormArray(control);
      await this.displayFeesDetails();

    });
  }

  async displayFeesDetails() {
    const registration: Registration = new Registration();
    registration.academicYearCode = this.feesFormControll.academicYearCode.value;
    registration.standard = this.feesFormControll.classCode.value;
    registration.registrationNo = this.feesFormControll.registrationNo.value;
    this.registrationModel = this.registrationService.studentList(registration);
    this.registrationModel.subscribe(res => {
      this.prepareParentDetails(res.data[0]);
      this.studentDetails = res.data[0];
      const feeStructure = res.data[0].studentFeesStructure[0];

      this.loadBookDressFees();

      //store to update discounts
      this.studentFeeStructure = feeStructure;
      const installment = feeStructure.studentFeesInstallment;


      this.totalNetPayable = 0;
      this.termFees = 0;
      this.totalAmount = 0;
      this.installmentDiscount = 0;
      this.annualAndRegistrationFee = 0;
      this.regPendingFees = 0;
      this.termFeesPendingAmount = 0;
      this.totalIndividualDiscount = 0;
      this.totalAmountAfterDiscount = 0;
      this.totalIndividualDiscount = 0;

      const control = <FormArray>this.formgroup.controls['studentFeesInstallment'];
      for (let i = 0; i < installment.length; i++) {

        this.totalAmount += installment[i].installmentAmount;
        this.installmentDiscount += installment[i].installmentDiscount;
        this.totalAmountAfterDiscount += (installment[i].installmentAmountAfterDiscount - installment[i].discountAmount);
        this.totalIndividualDiscount += Number(installment[i].discountAmount);

        let installmentPaidAmount = 0;
        if (this.feesPaid > (installment[i].installmentAmountAfterDiscount - installment[i].discountAmount)) {
          installmentPaidAmount = installment[i].installmentAmountAfterDiscount - installment[i].discountAmount;
          this.feesPaid = this.feesPaid - installmentPaidAmount;
        } else {
          installmentPaidAmount = this.feesPaid;
          this.feesPaid = 0;
        }
        const payable = (installment[i].installmentAmountAfterDiscount - installment[i].discountAmount) - installmentPaidAmount;
        this.totalNetPayable = this.totalNetPayable + payable;

        //first and second installment is preserved for registration and annual 
        //hence term fees calculate from third installment
        if (i <= 1) {
          this.annualAndRegistrationFee += installment[i].installmentAmount;
          this.regPendingFees += payable;
        } else {
          this.termFees += installment[i].installmentAmount;
          this.termFeesPendingAmount += payable;
        }

        control.push(
          new FormGroup({
            classCode: new FormControl(installment[i].classCode),
            academicYearCode: new FormControl(installment[i].academicYearCode),
            installmentNumber: new FormControl((Number(installment[i].installmentNumber))),
            installmentType: new FormControl(installment[i].installmentType),
            installmentDate: new FormControl(moment(installment[i].installmentDate).format(msgTypes.DD_MM_YYYY)),
            installmentAmount: new FormControl(installment[i].installmentAmount),
            installmentDiscount: new FormControl(installment[i].installmentDiscount),
            installmentAmountAfterDiscount: new FormControl(installment[i].installmentAmountAfterDiscount),
            discountAmount: new FormControl(installment[i].discountAmount),
            discountReason: new FormControl(installment[i].discountReason),
            amountAfterDiscount: new FormControl((installment[i].installmentAmountAfterDiscount - installment[i].discountAmount)),
            amountPaid: new FormControl(installmentPaidAmount),
            netPayable: new FormControl((installment[i].installmentAmountAfterDiscount - installment[i].discountAmount) - installmentPaidAmount)
          })
        )
      }
    })

  }


  prepareParentDetails(registartion: Registration) {
    this.parentDetails = [];
    this.parentDetails.push({ "name": registartion.fatherName, "contact": registartion.fatherContactNo });
    this.parentDetails.push({ "name": registartion.motherName, "contact": registartion.motherContactNumber });
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
    if (this.feesFormControll.paymenttype.value === 'Fees') {
      if (this.totalAmountAfterDiscount >= (Number(this.amountPaidTillDate) + Number(this.feesFormControll.amount.value))) {
        this.getFeesReceiptNumber();
      } else {
        this.sweetAlertService.showAlert("Amount Exceed", "Paid Amount is more than Total Fees", msgTypes.ERROR, msgTypes.OK_KEY);
      }
    } else if (this.feesFormControll.paymenttype.value === 'Book Fees') {
      if (Number(this.bookAndDressFeesModel.bookFees) >= (Number(this.bookFeesPaid) + Number(this.feesFormControll.amount.value))) {
        this.getFeesReceiptNumber();
      } else {
        this.sweetAlertService.showAlert("Amount Exceed", "Paid Amount is more than Book Fees", msgTypes.ERROR, msgTypes.OK_KEY);
      }
    }
    // else if(this.feesFormControll.paymenttype.value === 'Dress Fees'){
    //   let dressfees=0;
    //   if(this.studentDetails.gender==='M'){
    //     dressfees = Number(this.bookAndDressFeesModel.boyDressFees);
    //   }else{
    //     dressfees = Number(this.bookAndDressFeesModel.girlDressFees);
    //   }

    //   if(dressfees>=(Number(this.dressFeesPaid) + Number(this.feesFormControll.amount.value))){
    //       this.payFees();       
    //   }else{
    //     this.sweetAlertService.showAlert("Amount Exceed", "Paid Amount is more than Dress Fees", msgTypes.ERROR, msgTypes.OK_KEY);
    //   }
    // }
  }

  //pay fees
  async payFees() {
    this.feesModel = { ...this.feesModel, ...this.formgroup.value }
    this.feesModel.paymentDate = moment(this.feesModel.paymentDate).format(msgTypes.YYYY_MM_DD);
    this.feesModel.studentName = this.studentDetails.studentName;
    const year = this.feesModel.academicYearCode.substring(0,4);
    
    this.feesModel.receiptNo = ("TGS" + year + "/" + this.receiptnumber);
    this.feesModel.idCardNumber = this.studentDetails.idCardNumber;
    this.feesModel.amountInWords =  this.toWords.convert(Number(this.feesModel.amount));
    const classData = this.classList.filter(data=>{
        return data.classCode===this.feesModel.classCode;
    })
    this.feesModel.className =classData[0].className;
    const academicdata = this.academicyearList.filter(data=>{
      return data.academicYearCode===this.feesModel.academicYearCode;
    })
    this.feesModel.academicYear =academicdata[0].academicYear;


    try {
      this.feesService.insertFees(this.feesModel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE) {
          if (this.feesModel.paymenttype === "Fees") {
            this.studentDetails.paidFees = (Number(this.amountPaidTillDate) + Number(this.feesModel.amount));
            this.studentDetails.pendingFees = (Number(this.totalNetPayable) - Number(this.feesModel.amount));
            this.studentDetails.totalFees = this.totalAmountAfterDiscount;
            if (this.studentDetails.pendingFees === 0) {
              this.studentDetails.isTotalFeesPaid = true;
            } else {
              this.studentDetails.isTotalFeesPaid = false;
            }
            this.registrationService.updateFeesDetails(this.studentDetails).subscribe(res => {
              if (res.status === msgTypes.SUCCESS_MESSAGE) {
                this.clearPaymentDetails();
              }
            });
          } else {
            this.clearPaymentDetails();
          }

          let el: HTMLElement = this.printAndSaveButton.nativeElement;
          el.click();
        }
      });
    } catch (error) { }
  }

  clearPaymentDetails() {
    this.feesFormControll.amount.reset();
    this.feesFormControll.paymentMode.reset();
    this.feesFormControll.remarks.reset();
    this.getFeesDetails();
  }

  onDiscountReasonChange() {
    this.discountChanged = true;
  }

  onInstallmentDiscountChange(index: number) {
    this.discountChanged = true;

    const discount = this.formgroup.controls.studentFeesInstallment.value[index].discountAmount;
    const installmentAmount = this.formgroup.controls.studentFeesInstallment.value[index].installmentAmountAfterDiscount;
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

    this.totalAmountAfterDiscount = 0;
    this.totalNetPayable = 0;
    this.totalIndividualDiscount = 0;

    const control = <FormArray>this.formgroup.controls['studentFeesInstallment'];
    for (let i = 0; i < control.value.length; i++) {
      const afterDiscount = (Number(control.value[i].installmentAmountAfterDiscount) - Number(control.value[i].discountAmount));
      const netPayable = afterDiscount - control.value[i].amountPaid
      this.studentInstallmentFormGroups.controls[i].get('netPayable')?.setValue(netPayable);
      this.studentInstallmentFormGroups.controls[i].get('amountAfterDiscount')?.setValue(afterDiscount);
      this.totalAmountAfterDiscount += Number(control.value[i].amountAfterDiscount)
      this.totalNetPayable += control.value[i].amountAfterDiscount - control.value[i].amountPaid
      this.totalIndividualDiscount += Number(control.value[i].discountAmount);
    }
  }

  async updateFeeStructureDiscount() {
    // discount on registration fees 
    // this.studentFeeStructure.regFeesDiscount = this.feesFormControll.regFeesDiscount.value;
    // this.studentFeeStructure.regFeesDiscountReason = this.feesFormControll.regFeesDiscountReason.value;

    //discount on installment
    const control = <FormArray>this.formgroup.controls['studentFeesInstallment'];
    for (let i = 0; i < control.value.length; i++) {
      const installmentAmount = control.value[i].installmentAmount;
      const installmentDiscount = control.value[i].discountAmount;
      const discountReason = control.value[i].discountReason;
      const installmentNumber = Number(control.value[i].installmentNumber);

      this.studentFeeStructure.studentFeesInstallment.map(installment => {
        if (installment.installmentAmount === installmentAmount && installmentNumber === Number(installment.installmentNumber)) {
          installment.discountAmount = installmentDiscount;
          installment.discountReason = discountReason;
        }
      })
    }

    this.studentFeesStructureService.insertStudentFeesStructure(this.studentFeeStructure).subscribe(res => {
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
  openDialog() {
    const dialogRef = this.dialog.open(FeesReceiptComponent, {
      data: [this.feesData, this.studentDetails],
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  //Book Fees related functions
  loadBookDressFees() {
    this.payableBookFees = 0;
    //  this.payableDressFees = 0;
    const bookDressFees: BookAndDressFees = new BookAndDressFees();
    bookDressFees.academicYearCode = this.feesFormControll.academicYearCode.value;
    bookDressFees.standard = this.feesFormControll.classCode.value;
    this.bookDressFeesService.getByAcademicAndClass(bookDressFees).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.bookAndDressFeesModel = res.data[0];
        this.payableBookFees = Number(this.bookAndDressFeesModel.bookFees) - Number(this.bookFeesPaid);
        // if(this.studentDetails.gender==='M')
        //   this.payableDressFees = Number(this.bookAndDressFeesModel.boyDressFees) - Number(this.dressFeesPaid);
        // else
        //   this.payableDressFees = Number(this.bookAndDressFeesModel.girlDressFees) - Number(this.dressFeesPaid);

      }
    });
  }


}
