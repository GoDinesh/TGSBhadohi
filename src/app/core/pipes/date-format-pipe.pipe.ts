import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormatPipe'
})
export class DateFormatPipePipe implements PipeTransform {

  transform(value: string|null) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd-MM-yyyy');
    return value;
 }

}
