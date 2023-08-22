import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';
import { StudentInfo } from 'src/app/model/student/student-info.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  requestUrl = appurl.menuurl_student ;
  constructor(private httpClient: HttpClient) { }
 
  studentRegistration(registrationModel: Partial<Registration>){
     const url = this.requestUrl + appurl.student_registration + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(registrationModel))
  }

  studentList(studentInfo: StudentInfo){
    const url = this.requestUrl + appurl.student_list;
    return this.httpClient.post<ResponseModel>(url, JSON.stringify(studentInfo))
 }
}
