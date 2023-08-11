import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpandMenu]'
})
export class ExpandMenuDirective {

  @HostBinding('class.active') isOpen = false;
  @HostListener('click') toggleOpen($event: any){
    this.isOpen = !this.isOpen
  }

  constructor() { }

}
