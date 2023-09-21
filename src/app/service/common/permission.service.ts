import { Injectable } from '@angular/core';
import { INavbarData } from 'src/app/model/menu';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private permissions: INavbarData[] = [];


  constructor(private authService: AuthService) {
    this.permissions = JSON.parse(this.authService.getUserPermission());;
  }

  getEditableValue(route: string): boolean {
    let editable: boolean | undefined = false;
    this.permissions.forEach(permission => {
      if (permission.routerLink === route) {
        editable = permission.editable;
      }
      if (permission.children) {
        permission.children.forEach(child => {
          if (child.routerLink === route) {
            editable = child.editable;
          }
        });
      }
    });
    return editable;
  }
}
