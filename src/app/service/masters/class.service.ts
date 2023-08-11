import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { merge } from 'rxjs/internal/operators/merge';
import { appurl} from 'src/app/constants/common/appurl';
import { Class } from 'src/app/model/master/class.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
 requestUrl = appurl.menuurl_master + appurl.master_class;
 constructor(private httpClient: HttpClient) { }

 insertClass(classModel: Class){
    const url = this.requestUrl + appurl.endpoint_insert;
    return this.httpClient.post<ResponseModel>(url, JSON.stringify(classModel))
 }
 
 getAllClass(){
   const url = this.requestUrl + appurl.endpoint_findall;
   return this.httpClient.post<ResponseModel>(url, '')
 }

 updateClass(classModel: Class){
  const url = this.requestUrl + appurl.endpoint_update;
  return this.httpClient.post<ResponseModel>(url, JSON.stringify(classModel));
}


}
