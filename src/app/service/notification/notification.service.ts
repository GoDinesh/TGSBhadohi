import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { Notifications } from 'src/app/model/notification/notification.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  requestUrl = appurl.menuurl_notification;
  constructor(private httpClient: HttpClient) { }

  saveNotification(notificationModel: Notifications[]){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(notificationModel))
  }

  getAllNotifications(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

}
