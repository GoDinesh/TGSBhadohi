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
    discountAmount: number;
    netAmountAfterDiscount: number;
    registrationFees: number;
    annualFees: number;
    annualFeesDate: string;
    active: boolean;
    lumpsumAmount: number;

    installmentNo1: number;
    installmentDate1: string;
    installmentAmount1: number;

    installmentNo2: number;
    installmentDate2: string;
    installmentAmount2: number;

    installmentNo3: number;
    installmentDate3: string;
    installmentAmount3: number;

    installmentNo4: number;
    installmentDate4: string;
    installmentAmount4: number;

    installmentNo5: number;
    installmentDate5: string;
    installmentAmount5: number;

    installmentNo6: number;
    installmentDate6: string;
    installmentAmount6: number;

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
    this.discountAmount = 0;
    this.netAmountAfterDiscount = 0;
    this.registrationFees = 0;
    this.annualFees = 0;
    this.annualFeesDate = '';
    this.active = false;
    this.lumpsumAmount = 0;

    this.installmentNo1 = 1;
    this.installmentDate1 = "";
    this.installmentAmount1 = 0;

    this.installmentNo2 = 2;
    this.installmentDate2 = "";
    this.installmentAmount2 = 0;

    this.installmentNo3 = 3;
    this.installmentDate3 = "";
    this.installmentAmount3 = 0;

    this.installmentNo4 = 4;
    this.installmentDate4 = "";
    this.installmentAmount4 = 0;

    this.installmentNo5 = 5;
    this.installmentDate5 = "";
    this.installmentAmount5 = 0;

    this.installmentNo6 = 6;
    this.installmentDate6 = "";
    this.installmentAmount6 = 0;


    }
}
