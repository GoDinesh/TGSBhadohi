import { Injectable } from '@angular/core';
import { appurl } from '../../constants/common/appurl';
import { HttpClient } from '@angular/common/http';
import { PermissionGroup } from '../../model/master/permission-group.model';
import { ResponseModel } from '../../model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionGroupService {

  requestUrl = appurl.menuurl_master + appurl.master_permissionGroup;
  constructor(private httpClient: HttpClient) { }
 
  insertPermissionGroup(permissionGroupModel: PermissionGroup){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(permissionGroupModel))
  }
  
  getAllPermissionGroup(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }
}
