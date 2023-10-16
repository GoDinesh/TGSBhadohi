import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  
  requestUrl = appurl.menuurl_sms + appurl.send_sms;

  constructor(private http: HttpClient) { }

  sendSMS(body: string, to: string) {
    const url = this.requestUrl + appurl.endpoint_insert;
    return this.http.post<ResponseModel>(url, { body, to });
    // return this.http.post(this.requestUrl, { body, to });
  }
}
