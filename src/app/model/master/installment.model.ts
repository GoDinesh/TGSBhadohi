export class Installment {
    id: string;
    classCode: string;
    academicYearCode: string;
    installmentNumber: number;
    installmentDate: string;
    installmentAmount: number;

    constructor(){
        this.id = '',
        this.classCode ='';
        this.academicYearCode='';
        this.installmentNumber= 0;
        this.installmentDate = '';
        this.installmentAmount = 0;
    }
}
