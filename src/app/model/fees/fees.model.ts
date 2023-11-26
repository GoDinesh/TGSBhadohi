export class Fees {

    id: string;
	 classCode: string;
	 academicYearCode: string;
	 registrationNo: string;
    paymenttype: string;
	 paymentMode: string;
	 amount: number;
	 paymentDate: Date;
	 paymentReceivedBy: string;
    remarks: string;


     constructor(){
        this.id = "";
        this.classCode = "";
        this.academicYearCode = "",
        this.registrationNo = "",
        this.paymenttype = "";
        this.paymentMode = "";
        this.amount = 0;
        this.paymentDate = new Date();
        this.paymentReceivedBy = "";
        this.remarks = "";
     }
}
