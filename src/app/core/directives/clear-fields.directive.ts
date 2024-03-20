import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[clearFields]'
})
export class ClearFieldsDirective {

  @Input() clearFields!: FormControl[];
  
  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2
  ){}

  // Check if icon should be displayed or not
  ngDoCheck(): void {
    if(!this.clearFields[0].value || this.clearFields[0].disabled)
      this.renderer.addClass(this.elementRef.nativeElement, 'd-none');
    else
      this.renderer.removeClass(this.elementRef.nativeElement, 'd-none');
  }
  
  //Function on Click
  @HostListener('click', ['$event'])
  clickEvent(event: Event) {
    event.stopPropagation();
    for(let i=0; i<this.clearFields.length; i++){
      this.clearFields[i].setValue('');
    }
  }

}