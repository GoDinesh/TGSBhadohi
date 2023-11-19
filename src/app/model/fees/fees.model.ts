export class Fees {

    id: string;
	 classCode: string;
	 academicYearCode: string;
	 registrationNo: string;
	 paymentMode: string;
	 amount: number;
	 paymentDate: Date;
	 paymentReceivedBy: string;

     constructor(){
        this.id = "";
        this.classCode = "";
        this.academicYearCode = "",
        this.registrationNo = "",
        this.paymentMode = "";
        this.amount = 0;
        this.paymentDate = new Date();
        this.paymentReceivedBy = "";
     }
}
