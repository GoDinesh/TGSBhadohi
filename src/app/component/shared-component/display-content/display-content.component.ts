import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-display-content',
  templateUrl: './display-content.component.html',
  styleUrls: ['./display-content.component.css']
})
export class DisplayContentComponent {
  isSideNavCollapsed = true;
  screenWidth !: number;

  ngOnInit(){
    this.screenWidth = window.innerWidth;
  }
  
  onToggleSideNav(data: SideNavToggle){
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
