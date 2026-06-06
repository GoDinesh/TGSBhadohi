import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { Syllabus } from 'src/app/model/master/syllabus.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {
  requestUrl = appurl.menuurl_master + appurl.master_syllabus;
  constructor(private httpClient: HttpClient) { }

  insertSyllabus(syllabusModel: Syllabus) {
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(syllabusModel))
  }

  getAllSyllabus(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  getAllActiveSyllabus(){
    const url = this.requestUrl + appurl.endpoint_allActiveRecords;
    return this.httpClient.get<ResponseModel>(url)
  }

}
