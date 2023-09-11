import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { menuListAdmin } from 'src/app/constants/common/menu-list-admin';

@Injectable({
  providedIn: 'root'
})
export class AssignPermissionToGroupService {

  // Initialize an array to store "text" values from the children of "Master"
  masterChildrenTextValues: string[] = [];
  masterItem: any = '';
  private sourceListData = new BehaviorSubject<string[]>([]);
  sourceListData$ = this.sourceListData.asObservable();

  updateSourceListData(data: string[]) {
    this.sourceListData.next(data);
    console.log(data);
  }

  filterKeyword() {
    // Find the "Master" item in menuListAdmin
    this.masterItem = menuListAdmin.find((item) => item.text === 'Master');
    // Check if the "Master" item was found and it has children
    if (this.masterItem && this.masterItem.children) {
      // Extract "text" values from the children of "Master" and store them in masterChildrenTextValues
      this.masterItem.children.forEach((child: { text: any; }) => {
        if (child.text) {
          this.masterChildrenTextValues.push(child.text);
        }
      });
    }
    this.updateSourceListData(this.masterChildrenTextValues);
  }

}
