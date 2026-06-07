import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { TimeTable } from 'src/app/model/master/time-table.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
 requestUrl = appurl.menuurl_master + appurl.master_timetable;
  constructor(private httpClient: HttpClient) { }

  insertTimeTable(timeTableModel: TimeTable) {
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(timeTableModel))
  }

  getAllTimeTable(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  getAllActiveTimeTable(){
    const url = this.requestUrl + appurl.endpoint_allActiveRecords;
    return this.httpClient.get<ResponseModel>(url)
  }
}
