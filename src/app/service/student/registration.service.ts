import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  requestUrl = appurl.menuurl_student ;
  constructor(private httpClient: HttpClient) { }
 
  studentRegistration(registrationModel: Partial<Registration>){
    console.log(JSON.stringify(registrationModel));
    
     const url = this.requestUrl + appurl.student_registration ;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(registrationModel))
  }

  studentList(studentInfo: Registration){
    const url = this.requestUrl + appurl.endpoint_filter;
    return this.httpClient.post<ResponseModel>(url, JSON.stringify(studentInfo))
  }

  // updateStudentRegistration(requestData: Registration){
  //   const url = this.requestUrl + appurl.student_registration + appurl.endpoint_update;
  //   return this.httpClient.post<ResponseModel>(url, JSON.stringify(requestData))
  // }

  studentRegistrationWithImage(formData: FormData){
     const url = this.requestUrl + appurl.upload_image ;
     return this.httpClient.post<ResponseModel>(url, formData)
  }

  getRollNumber(reg : Registration){
    const url = this.requestUrl + appurl.get_rollnumber ;
    return this.httpClient.post<ResponseModel>(url, reg)
  }
}
