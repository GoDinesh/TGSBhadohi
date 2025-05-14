import { Installment } from "./installment.model";

export class FeesStructure {
    feeStructureId: string;
    classCode: string;
    enrollmentType: string;
    academicYearCode: string;
    noOfInstallments:number;
    paymentType: string;
    validityStartDate: string;
    validityEndDate: string;
    remarks: string;
    totalFees: number;
    discountReasonCode: string;
    discountAmount: number;
    netAmountAfterDiscount: number;
   // registrationFees: number;
   // annualFees: number;
   // annualFeesDate: string;
    active: boolean;
    lumpsumAmount: number;
    regFeesDiscount: number;
    regFeesDiscountReason: string;

    // installmentNo1: number;
    // installmentDate1: string;
    // installmentAmount1: number;
    installment: Installment[];
    tableAcademicYearCode: string;


    constructor(){
    this.feeStructureId = '',
    this.classCode = '';
    this.enrollmentType = '';
    this.academicYearCode = '';
    this.noOfInstallments = 0;
    this.paymentType = '';
    this.validityStartDate = '';
    this.validityEndDate = '';
    this.remarks = '';
    this.totalFees= 0;
    this.discountReasonCode = '';
    this.discountAmount = 0;
    this.netAmountAfterDiscount = 0;
    // this.registrationFees = 0;
    // this.annualFees = 0;
    // this.annualFeesDate = '';
    this.active = true;
    this.lumpsumAmount = 0;
    this.regFeesDiscount= 0;
    this.regFeesDiscountReason='';

    this.installment=[];

    this.tableAcademicYearCode = '';

    }
}
