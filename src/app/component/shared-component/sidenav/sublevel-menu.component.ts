import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, submenu, INavbarData } from 'src/app/model/menu';

@Component({
  selector: 'app-sublevel-menu',
  templateUrl: './sublevel-menu.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    fadeInOut,
    submenu]
})
export class SublevelMenuComponent {

  @Input() data: INavbarData = {
    routerLink: '',
    icon: '',
    text: '',
    children: []
  }
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(public router: Router){}


  handleClick(item:INavbarData, data:INavbarData){
    this.shrinkItem(item,data);
    item.expanded = !item.expanded;
  }

  shrinkItem(item: INavbarData, data:INavbarData){
    if(!this.multiple){
      if(data.children && data.children.length > 0){
        for(let modelItem of data.children){
          if(item !== modelItem && modelItem.expanded)
            modelItem.expanded = false;
            if(modelItem.children && modelItem.children.length > 0)
              this.shrinkItem(item, modelItem);
        }
      }
    }
  }
}
