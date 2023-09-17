import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { User } from 'src/app/model/master/user.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestUrl = appurl.menuurl_master + appurl.master_user;
  constructor(private httpClient: HttpClient) { }
 
  insertUser(user: User){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(user))
  }
  
  getAllUsers(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  getUserByEmailId(email: string){
    const url = this.requestUrl + appurl.endpoint_findbyid;
    return this.httpClient.post<ResponseModel>(url, email);
  }
}
