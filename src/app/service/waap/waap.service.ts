import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { Fees } from 'src/app/model/fees/fees.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';
import { Waappathway } from 'src/app/model/waap/waappathway.model';

@Injectable({
  providedIn: 'root'
})
export class WaapService {

   requestUrl = appurl.waap + appurl.waappathway;
    //private apiUrl = `waap##https://wa.techrush.in/api/http-authkey.php?authkey=383574696d65676c6f62616c3130301747468493&route=2&number=8115216592&message=Namaste`;
    constructor(private httpClient: HttpClient) { }

    getAllWaappathway(){
      const url = this.requestUrl + appurl.endpoint_findall;
      return this.httpClient.get<ResponseModel>(url)
    }

    sentFeesReceiptMessage(fees: Fees, waappathway: Waappathway, studentDetails: Registration){
          console.log('studentDetails',studentDetails);
          console.log('fees', fees);
          let mobilenumber='';
          let parentname = '';
          if(fees.paymentReceivedBy===studentDetails.fatherName){
            mobilenumber = studentDetails.fatherContactNo;
            parentname = studentDetails.fatherName;
          }
          if(fees.paymentReceivedBy===studentDetails.motherName){
            mobilenumber = studentDetails.motherContactNumber;
            parentname = studentDetails.motherName;
          }

          const message = `Hello ${parentname},
Thank you! We’ve successfully received the school fee payment for ${studentDetails.studentName} for the ${fees.month}.

Details:
	•	Amount: ₹${fees.amount}
	•	Date: ${fees.paymentDate}
	•	Payment Mode: ${fees.paymentMode}

We appreciate your prompt payment.

Warm regards,
Time Global School Bhadohi
`

          let url = `waap## ${waappathway.url}?authkey=${waappathway.authkey}&route=${waappathway.route}&number=${mobilenumber}&message=${message}`
          return this.httpClient.get<any>(url);
    }
  }
