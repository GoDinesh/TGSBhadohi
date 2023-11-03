import { Injectable } from '@angular/core';
import { INavbarData } from 'src/app/model/menu';
import { AuthService } from './auth.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private permissions: Observable<INavbarData[]> = new Observable();

  // constructor(private authService: AuthService) {
  //   try{
  //     this.permissions = JSON.parse(this.authService.getUserPermission()); 
  //   }catch(error){
  //     console.log(error); 
  //   }
  // }
  constructor(private authService: AuthService) {
    try {
      const parsedPermissions = JSON.parse(this.authService.getUserPermission());
      // console.log(parsedPermissions);
      this.permissions = of(parsedPermissions);  // Convert array to Observable
    } catch (error) {
      // console.log(error);
      this.permissions = of([]);  // Default to an empty array wrapped in an Observable
    }
  }

  //get the current route and use it for managing the editable value
  updateEditableValue(url: string): Observable<boolean | undefined> {
    const currentRoute = url.substring(1); // Remove the leading '/'
    const cleanedRoute = currentRoute.replace('navmenu/', ''); // Remove 'navmenu/' prefix
    return this.getEditableValue(cleanedRoute);
  }

  // getEditableValue(route: string): Observable<boolean | undefined> {
  //   return new Observable<boolean | undefined>((observer) => {
  //     this.permissions.subscribe((permissionsArray: INavbarData[]) => {
  //       console.log("Permissions Array:", permissionsArray);  // Debug line
  //       let editable: boolean | undefined;
  
  //       if (this.authService.getUserType() === 'ADMIN') {
  //         editable = true;
  //       } else {
  //         console.log("User is NOT ADMIN");  // Debug line
  //         editable = false;
  //       }
  
  //       for (const permission of permissionsArray) {
  //         if (permission.routerLink === route) {
  //           console.log("Matched route:", route);  // Debug line
  //           editable = permission.editable;
  //         }
  //         if (permission.children) {
  //           for (const child of permission.children) {
  //             if (child.routerLink === route) {
  //               console.log("Matched child route:", route);  // Debug line
  //               editable = child.editable;
  //             }
  //           }
  //         }
  //       }
  
  //       observer.next(editable);
  //       console.log('Observable emitted:', editable); 
  //       observer.complete();
  //     });
  //   });
  // }

  getEditableValue(route: string): Observable<boolean | undefined> {
    return this.permissions.pipe(
      switchMap((permissionsArray: INavbarData[]) => {
        // console.log("Permissions Array:", permissionsArray);  // Debug line
        let editable: boolean | undefined;
  
        if (this.authService.getUserType() === 'ADMIN') {
          editable = true;
          // console.log('ADMIN');
          
        } else {
          // console.log("User is NOT ADMIN");  // Debug line
          editable = false;
        }
  
        for (const permission of permissionsArray) {
          if (permission.routerLink === route) {
            // console.log("Matched route:", route);  // Debug line
            editable = permission.editable;
          }
          if (permission.children) {
            for (const child of permission.children) {
              if (child.routerLink === route) {
                // console.log("Matched child route:", route);  // Debug line
                editable = child.editable;
              }
            }
          }
        }
        
        // console.log('Observable will emit:', editable);
        return of(editable);  // 'of' is used to return an Observable
      })
    );
  }
  
  
}
