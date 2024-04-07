import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { msgTypes } from 'src/app/constants/common/msgType';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  requestUrl = appurl.menuurl_student ;
  constructor(private httpClient: HttpClient) { }
 
  studentRegistration(registrationModel: Partial<Registration>){
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

  getMaxRegistrationNumber(){
    const url = this.requestUrl + appurl.get_max_registration_number;
    return this.httpClient.post<ResponseModel>(url, "")
  }

  getStudentListByGlobalFilter(keyword : string){
    const url = this.requestUrl + appurl.filter_by_keyword ;
    return this.httpClient.post<ResponseModel>(url, keyword)
  }

  promoteStudent(studentList: Registration[]){
    const url = this.requestUrl + appurl.promote_student;
    return this.httpClient.post<ResponseModel>(url, studentList)
  }

  updateStatusAfterPromote(studentList: Registration[]){
    const url = this.requestUrl + appurl.update_status_as_inactive;
    return this.httpClient.post<ResponseModel>(url, studentList)
  }

  updateFeesDetails(registration: Registration){
    const url = this.requestUrl + appurl.update_fees_details;
    return this.httpClient.post<ResponseModel>(url, registration)
  }

  updateStudentdetails(registration: Registration){
    const url = this.requestUrl + appurl.update_student_details;
    return this.httpClient.post<ResponseModel>(url, registration)
  }
}
