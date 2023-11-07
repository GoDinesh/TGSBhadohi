export class StudentFeesInstallment {
    id: string;
	registrationNo: string;
	classCode: string;
	academicYearCode: string;
	installmentNumber: string;
	discountReason: string;
	discountAmount: string;
	installmentDate: string;
	installmentAmount: string;

    constructor(){
        this.id ='';
        this.registrationNo='';
        this.classCode='';
        this.academicYearCode='';
        this.installmentNumber='';
        this.discountReason='';
        this.discountAmount='';
        this.installmentDate='';
        this.installmentAmount='';
    }
}
