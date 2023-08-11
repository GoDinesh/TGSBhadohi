import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {
  requestUrl = appurl.menuurl_master + appurl.master_academicyear;
  constructor(private httpClient: HttpClient) { }
 
  insertAcademicYear(academicYearModel: AcademicYear){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(academicYearModel))
  }
  
  getAllAcademicYear(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.post<ResponseModel>(url, '')
  }
 
  updateAcademicYear(academicYearModel: AcademicYear){
   const url = this.requestUrl + appurl.endpoint_update;
   return this.httpClient.post<ResponseModel>(url, JSON.stringify(academicYearModel));
 }
 
 }
