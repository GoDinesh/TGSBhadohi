import { Pipe, PipeTransform } from '@angular/core';
import { Registration } from 'src/app/model/student/registration.model';

@Pipe({
  name: 'filterStudentList'
})
export class FilterStudentListPipe implements PipeTransform {

  transform(items: Registration[], searchText: string): Registration[] {
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchText) { return items; }

    // retrun the filtered array
    return items.filter(item => {
      if (item && item["studentName"]) {
        return item["studentName"].toLowerCase().includes(searchText.toLowerCase())
        || item["registrationNo"].toLowerCase().includes(searchText.toLowerCase())
        || item["fatherContactNo"].includes(searchText);
        }
      return false;
    });
   }

}
