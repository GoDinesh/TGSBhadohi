export class FeesStructure {
    id: string;
    classCode: string;
    enrollmentType: string;
    academicYearCode: string;
    paymentType: string;
    validityStartDate: string;
    validityEndDate: string;
    remarks: string;
    totalFees: number;
    discountReasonCode: string;
    netAmountAfterDiscount: number;
    registrationFees: number;
    annualFees: number;
    annualFeesDate: string;

    constructor(){
    this.id = '',
    this.classCode = '';
    this.enrollmentType = '';
    this.academicYearCode = '';
    this.paymentType = '';
    this.validityStartDate = '';
    this.validityEndDate = '';
    this.remarks = '';
    this.totalFees= 0;
    this.discountReasonCode = '';
    this.netAmountAfterDiscount = 0;
    this.registrationFees = 0;
    this.annualFees = 0;
    this.annualFeesDate = '';


    }
}
