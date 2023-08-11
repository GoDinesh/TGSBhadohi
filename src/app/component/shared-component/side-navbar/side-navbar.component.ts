import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menuListAdmin } from 'src/app/constants/common/menu-list-admin';
import { menuListUser } from 'src/app/constants/common/menu-list-user';
import { msgTypes } from 'src/app/constants/common/msgType';
import { routeType } from 'src/app/constants/common/routeType';
import { AuthService } from 'src/app/service/common/auth.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent  {
  menuListItem: any;
  userType: string = '';
  isExpanded = true

  constructor(
    private router:Router,
    private sweetAlertService: SweetAlertService,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    this.loadMenuList();
    // this.reloadCurrentRoute();
  }

  loadMenuList(){
    
    let userType = localStorage.getItem('userType');
    if(userType){
        const decryptedUserType = this.authService.getDecryptText(userType)
        if( decryptedUserType === msgTypes.ADMIN)
          this.menuListItem = menuListAdmin;
        if( decryptedUserType === msgTypes.USER)
          this.menuListItem = menuListUser;
    }
  }

  logout(){
    localStorage.clear();
    this.sweetAlertService.showAlert(msgTypes.LOGOUT, msgTypes.LOGOUT_MESSAGE, msgTypes.SUCCESS, msgTypes.OK_KEY);
    this.router.navigate([routeType.LOGIN]);
  }

//   reloadCurrentRoute() {
//     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
// }
  
}
