import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appurl } from 'src/app/constants/common/appurl';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Holiday } from 'src/app/model/master/holiday.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  requestUrl = appurl.menuurl_master + appurl.master_holiday;
  constructor(private httpClient: HttpClient) { }

  insertHoliday(holidayModel: Holiday){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(holidayModel))
  }

  getAllHoliday(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  getAllActiveHoliday(){
    const url = this.requestUrl + appurl.endpoint_allActiveRecords;
    return this.httpClient.get<ResponseModel>(url)
  }
}
