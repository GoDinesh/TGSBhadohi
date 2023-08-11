import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { DiscountReason } from 'src/app/model/master/discount-reason.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountReasonService {

 requestUrl = appurl.menuurl_master + appurl.master_discountreason;
 constructor(private httpClient: HttpClient) { }

 insertDiscountReason(discountReasonModel: DiscountReason){
    const url = this.requestUrl + appurl.endpoint_insert;
    return this.httpClient.post<ResponseModel>(url, JSON.stringify(discountReasonModel))
 }
 
 getAllDiscountReason(){
   const url = this.requestUrl + appurl.endpoint_findall;
   return this.httpClient.post<ResponseModel>(url, '')
 }

 updateDiscountReason(discountReasonModel: DiscountReason){
  const url = this.requestUrl + appurl.endpoint_update;
  return this.httpClient.post<ResponseModel>(url, JSON.stringify(discountReasonModel));
}

}
