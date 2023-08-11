import { AnimationEvent, transition, style, animation, animate } from '@angular/animations';
import { Component, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { menuListAdmin } from 'src/app/constants/common/menu-list-admin';
import { menuListUser } from 'src/app/constants/common/menu-list-user';
import { msgTypes } from 'src/app/constants/common/msgType';
import { fadeInOut, INavbarData } from 'src/app/model/menu';
import { AuthService } from 'src/app/service/common/auth.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { SublevelMenuComponent } from './sublevel-menu.component';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [fadeInOut]
})
export class SidenavComponent {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth !: number;
  navData !:INavbarData[];
  multiple: boolean = false;
  data: INavbarData = {
    routerLink: '',
    icon: '',
    text: '',
  }
  @ViewChild(SublevelMenuComponent) child!:SublevelMenuComponent;

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = event.target.innerWidth;
    if(this.screenWidth <= 768)
      this.collapsed = false;
    else
      this.collapsed = true;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  constructor(private router: Router,
              private sweetAlertService: SweetAlertService,
              private authService: AuthService){}

  ngOnInit(){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768)
      this.collapsed = false;
    this.loadMenuList();
    this.shrinkItem(this.data);
  }

  loadMenuList(){
    const userType = this.authService.getRole();
    if(userType){
        if( userType === msgTypes.ADMIN)
          this.navData = menuListAdmin;
        else if( userType === msgTypes.USER)
          this.navData = menuListUser;
    }
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData){
    this.shrinkItem(item);
    item.expanded = !item.expanded;
  }

  // getActiveClass(data: INavbarData){
  //   if(data.routerLink)
  //     return this.router.url.includes(data.routerLink) ? 'active' : '';
  //   return '';
  // }

  shrinkItem(item: INavbarData){
    if(!this.multiple){
      for(let modelItem of this.navData){
        if(item !== modelItem && modelItem.expanded)
          modelItem.expanded = false;
          if(modelItem.children && modelItem.children.length > 0)
            this.child.shrinkItem(item, modelItem);
      }
    }
  }

  logout(){
    localStorage.clear();
    this.sweetAlertService.showAlert(msgTypes.SUCCESS_MESSAGE, msgTypes.LOGOUT_MESSAGE, msgTypes.SUCCESS, msgTypes.OK_KEY);
    this.router.navigate(['/login']);
  }
}