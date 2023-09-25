import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { FeesStructure } from 'src/app/model/master/fees-structure.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class FeesStructureService {

  requestUrl = appurl.menuurl_master + appurl.master_feeStructure;
  constructor(private httpClient: HttpClient) { }
 
  insertFeesStructure(feesStructureModel: FeesStructure){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(feesStructureModel))
  }
  
  getAllFeesStructure(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }
 
}
