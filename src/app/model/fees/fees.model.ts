import { Registration } from "../student/registration.model";

export class Fees {

  id: string;
  classCode: string;
  academicYearCode: string;
  academicYear: string;
  registrationNo: string;
  paymenttype: string;
  paymentMode: string;
  amount: number;
  paymentDate: string;
  paymentReceivedBy: string;
  remarks: string;
  studentName: string;

  receiptNo: string;
  idCardNumber: string;
  amountInWords: string;
  className: string;

  startDate: string;
  endDate: string;
  rollnumber: string;
  balanceFees: number;
  balanceBookFees: number;
  updatedBy: String;
  //    registrationId: string;


  constructor() {
    this.id = "";
    this.classCode = "";
    this.academicYearCode = "",
    this.academicYear = "",
      this.registrationNo = "",
      this.paymenttype = "";
    this.paymentMode = "";
    this.amount = 0;
    this.paymentDate = "";
    this.paymentReceivedBy = "";
    this.remarks = "";
    this.studentName = "";
    
    this.receiptNo="";
    this.idCardNumber="";
    this.amountInWords="";
    this.className = "";

    this.startDate = "";
    this.endDate = "";
    //  this.registrationId="";
  }
}
