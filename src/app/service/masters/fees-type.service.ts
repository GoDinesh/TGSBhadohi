import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { FeesType } from 'src/app/model/master/fees-type.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class FeesTypeService {
  requestUrl = appurl.menuurl_master + appurl.master_feestype;
  constructor(private httpClient: HttpClient) { }
 
  insertFeesType(feesTypeModel: FeesType){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(feesTypeModel))
  }
  
  getAllFeesType(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  getAllActiveFeesType(){
    const url = this.requestUrl + appurl.endpoint_allActiveRecords;
    return this.httpClient.get<ResponseModel>(url)
  }
 
//   updateFeesType(feesTypeModel: FeesType){
//    const url = this.requestUrl + appurl.endpoint_update;
//    return this.httpClient.post<ResponseModel>(url, JSON.stringify(feesTypeModel));
//  }
 
}
