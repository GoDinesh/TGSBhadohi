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
    registrationFees: number;
    annualFees: number;
    annualFeesDate: string;
    active: boolean;
    lumpsumAmount: number;

    // installmentNo1: number;
    // installmentDate1: string;
    // installmentAmount1: number;
    installment: Installment[];

    
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
    this.registrationFees = 0;
    this.annualFees = 0;
    this.annualFeesDate = '';
    this.active = false;
    this.lumpsumAmount = 0;

    this.installment=[];

    }
}
