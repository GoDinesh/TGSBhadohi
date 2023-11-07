import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { StudentFeesStructure } from 'src/app/model/fees/student-fees-structure.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class StudentFeesStructureService {
  requestUrl = appurl.menuurl_student + appurl.student_fees_structure;
  constructor(private httpClient: HttpClient) { }
 
  insertFees(studentFeesStructure: StudentFeesStructure){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(studentFeesStructure))
  }
  
  getAllFees(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  getByAcademicYearAndClass(studentFeesStructure: StudentFeesStructure){
    const url = this.requestUrl + appurl.endpoint_findbyid;
    return this.httpClient.post<ResponseModel>(url, studentFeesStructure)
  }
}
