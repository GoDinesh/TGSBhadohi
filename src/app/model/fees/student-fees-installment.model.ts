export class StudentFeesInstallment {
    id: string;
	registrationNo: string;
	classCode: string;
	academicYearCode: string;
	installmentNumber: string;
    installmentType: string;
    discountReason: string;
	discountAmount: string;
    installmentDate: string;
    installmentDiscount: string;
    installmentAmount: string;
    installmentAmountAfterDiscount: string;
	
	
	

    constructor(){
        this.id ='';
        this.registrationNo='';
        this.classCode='';
        this.academicYearCode='';
        this.installmentNumber='';
        this.installmentType = '';
        this.discountReason='';
        this.discountAmount='';
        this.installmentDate='';
        this.installmentDiscount = '';
        this.installmentAmount='';
        this.installmentAmountAfterDiscount = '';
    }
}
