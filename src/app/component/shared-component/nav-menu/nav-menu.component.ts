import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  baseurl: string = 'navmenu/';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(
      private observer:BreakpointObserver,
      private router: Router
      ) { }

  ngOnInit(): void {
  }
  
  // ngAfterViewInit(){
  //   this.observer.observe(['(max-width: 800px)']).subscribe(res=>{
  //     if(res.matches){
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close();
  //     }else{
  //       this.sidenav.mode = 'side';
  //       this.sidenav.open();
  //     }
  //   })
  // }

  navigateUrl(endpoint: string){
    this.router.navigateByUrl(this.baseurl+endpoint);
  }

  @Input() collapsed = true;
  @Input() screenWidth = 0;

  getBodyClass(){
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'
    }
    else
      styleClass = 'body-md-screen'
    return styleClass;
  }

  
}