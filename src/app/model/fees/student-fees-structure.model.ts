import { StudentFeesInstallment } from "./student-fees-installment.model";

export class StudentFeesStructure {
    studentFeeStructureId: string;
	registrationNo: string;
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
    regFeesDiscount: number;
    regFeesDiscountReason: string;

    studentFeesInstallment: StudentFeesInstallment[];

    
    constructor(){
    this.studentFeeStructureId='';
    this.registrationNo= '';
    this.classCode = '';
    this.enrollmentType = '';
    this.academicYearCode = '';
    this.noOfInstallments = 0;
    this.paymentType = '';
    this.totalFees= 0;
    this.discountReasonCode = '';
    this.discountAmount = 0;
    this.netAmountAfterDiscount = 0;
    this.registrationFees = 0;
    this.annualFees = 0;
    this.annualFeesDate = '';
    this.active = false;
    this.lumpsumAmount = 0;
    this.regFeesDiscount= 0;
    this.regFeesDiscountReason='';

    this.studentFeesInstallment=[];

    }
}
