import { Injectable } from '@angular/core';
import { INavbarData } from 'src/app/model/menu';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private permissions: INavbarData[] = [];


  constructor(private authService: AuthService) {
    try{
      this.permissions = JSON.parse(this.authService.getUserPermission());
    }catch(error){
      console.log(error);
      
    }

  }

  //get the current route and use it for managing the editable value
  updateEditableValue(url: string): boolean {
    const currentRoute = url.substring(1); // Remove the leading '/'
    const cleanedRoute = currentRoute.replace('navmenu/', ''); // Remove 'navmenu/' prefix
    return this.getEditableValue(cleanedRoute);
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
