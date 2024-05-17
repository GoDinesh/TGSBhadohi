import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Fees } from 'src/app/model/fees/fees.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';

@Injectable({
  providedIn: 'root'
})
export class FeesService {
  requestUrl = appurl.menuurl_fees;
  constructor(private httpClient: HttpClient) { }
 
  insertFees(feesModel: Fees){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(feesModel))
  }
  
  getAllFees(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  getPaidFeesOfStudent(feesModel: Fees){
    const url  = this.requestUrl + appurl.endpoint_filter;
    return this.httpClient.post<ResponseModel>(url, JSON.stringify(feesModel))
  }

  getMaxReceiptNo(){
    const url  = this.requestUrl + appurl.get_receipt_number;
    return this.httpClient.get<ResponseModel>(url)
  }

  getPendingFees(reg: Registration){
    const url  = this.requestUrl + appurl.pending_fees;
    return this.httpClient.post<ResponseModel>(url, JSON.stringify(reg));
  }

  getTotalPendingFeesClassWise(reg: Registration){
    const url  = this.requestUrl + appurl.Pending_fees_class_wise;
    return this.httpClient.post<ResponseModel>(url, JSON.stringify(reg));
  }

  // getFeesDetailsByReceiptNo(fees: Fees){
  //   console.log(JSON.stringify(fees));
    
  //   const url  = this.requestUrl + appurl.get_receipt_number;
  //   return this.httpClient.post<ResponseModel>(url, fees)
  // }
}
