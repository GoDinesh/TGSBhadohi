export class Installment {
    id: string;
    classCode: string;
    academicYearCode: string;
    installmentNumber: number;
    installmentType: string;
    installmentDate: string;
    installmentDiscount: string;
    installmentAmount: number;
    installmentAmountAfterDiscount: number;
    installmentMonth: string;

    constructor(){
        this.id = '',
        this.classCode ='';
        this.academicYearCode='';
        this.installmentNumber= 0;
        this.installmentType = '';
        this.installmentDate = '';
        this.installmentDiscount = '';
        this.installmentAmount = 0;
        this.installmentAmountAfterDiscount = 0;
        this.installmentMonth="";
    }
}
