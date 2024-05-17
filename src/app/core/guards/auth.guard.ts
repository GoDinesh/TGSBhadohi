import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/common/auth.service';
import { LocalStorageService } from 'src/app/service/common/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  routeURL!: string;

  constructor(private router: Router, 
              private authService: AuthService,
              private localStorageService: LocalStorageService) 
  {
    this.routeURL = this.router.url;
  }

  //Can Activate Route
  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkUserLogin(route);
  }

  //Can Load Route
  canLoad(route: ActivatedRouteSnapshot) {
    return this.checkUserLogin(route);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    // if (this.authService.isLoggedIn()) {
    //   const userRole = this.authService.getRole();
    //   const role = route.data['role'];
      
    //   if (role && role.indexOf(userRole) === -1) {
    //       this.localStorageService.clearWithoutRouting();
    //       this.router.navigate(['unauthorized-attempt']);
    //       return false;
    //   }
    //   return true;
    // }
    // this.localStorageService.clear();
    // this.router.navigate(['']);
    // return false;

    return true;
  }
}
