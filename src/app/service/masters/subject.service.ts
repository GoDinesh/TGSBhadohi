import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Subjects } from 'src/app/model/master/subjects.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  requestUrl = appurl.menuurl_master + appurl.master_subject;
  constructor(private httpClient: HttpClient) { }

  insertSubject(SubjectModel: Subjects){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(SubjectModel))
  }

  getAllSubject(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  getAllActiveSubject(){
    const url = this.requestUrl + appurl.endpoint_allActiveRecords;
    return this.httpClient.get<ResponseModel>(url)
  }


}
