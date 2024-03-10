import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { BookAndDressFees } from 'src/app/model/master/book-and-dress-fees.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class BookAndDressFeesService {
  requestUrl = appurl.menuurl_master + appurl.master_bookAndDressFees;
  constructor(private httpClient: HttpClient) { }
 
  insertBookAndDressFees(bookAndDressFeesModel: BookAndDressFees){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(bookAndDressFeesModel))
  }
  
  getAllBookAndDressFees(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  getByAcademicAndClass(bookDressFees: BookAndDressFees){
    const url = this.requestUrl + appurl.endpoint_findbyid;
    return this.httpClient.post<ResponseModel>(url, JSON.stringify(bookDressFees))
  }
  // getAllActiveAcademicYear(){
  //   const url = this.requestUrl + appurl.endpoint_allActiveRecords;
  //   return this.httpClient.get<ResponseModel>(url)
  // }

}
