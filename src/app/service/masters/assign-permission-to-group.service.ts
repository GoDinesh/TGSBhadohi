import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appurl } from 'src/app/constants/common/appurl';
import { AssignPermissionToGroup } from 'src/app/model/master/assign-permission-to-group.model';
import { INavbarData } from 'src/app/model/menu';
import { ResponseModel } from 'src/app/model/shared/response-model.model';

@Injectable({
  providedIn: 'root'
})
export class AssignPermissionToGroupService {
  requestUrl = appurl.menuurl_master + appurl.master_assignPermission;
  constructor(private httpClient: HttpClient) { }
 
  insertAssignPermissionToGroup(assignPermissionToGroup: AssignPermissionToGroup){
     const url = this.requestUrl + appurl.endpoint_insert;
     return this.httpClient.post<ResponseModel>(url, JSON.stringify(assignPermissionToGroup))
  }
  
  getAllAssignPermissionToGroup(){
    const url = this.requestUrl + appurl.endpoint_findall;
    return this.httpClient.get<ResponseModel>(url)
  }

  //get the permissions base on th role id
  getPermissionsByRole(roleId: string): Observable<ResponseModel> {
    const url = this.requestUrl + appurl.endpoint_findbyid;
    return this.httpClient.post<ResponseModel>(url, roleId);
  }


  setAllActivePropertiesToFalse(nodes: INavbarData[]) {
    nodes.forEach(node => {
      node.active = false;
      if (node.children) {
        this.setAllActivePropertiesToFalse(node.children);
      }
    });
  }

  updateClonedListBasedOnSelection(clonedNodes: INavbarData[], selectedNodes: any[], editable: { [nodeId: string]: boolean }): boolean {
    let anyChildActive = false;
    clonedNodes.forEach(node => {
      const correspondingFlatNode = selectedNodes.find(
        selectedNode => selectedNode.text === node.text
      );
      node.active = !!correspondingFlatNode?.active;

      //Initialize or Update the 'selectedChips' property based on nodeId
      // If the node is a leaf node (i.e., it doesn't have children), then update 'selectedChips'
      if (!node.children) {
        if (node.text && editable[node.text]) {
          node.editable = editable[node.text];
        } else {
          node.editable = false; //default value
        }
      }

      if (node.children) {
        const childActive = this.updateClonedListBasedOnSelection(node.children, selectedNodes, editable);
        if (childActive) {
          node.active = true;
        }
      }

      if (node.active) {
        anyChildActive = true;
      }
    });
    return anyChildActive;
  }

  deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  selectAllNodes(treeControl: FlatTreeControl<any>, checkboxSelections: SelectionModel<any>) {
    treeControl.dataNodes.forEach(node => {
      checkboxSelections.select(node);
      node.active = true;
    });
  }

  deselectAllNodes(treeControl: FlatTreeControl<any>, checkboxSelections: SelectionModel<any>) {
    treeControl.dataNodes.forEach(node => {
      checkboxSelections.deselect(node);
      node.active = false;
    });
  }
}

