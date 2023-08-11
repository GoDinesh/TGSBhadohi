import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

showAlert(title: string, message: string, msgType: any, buttonText: any){
    let alertData;
    if (buttonText) {
        alertData = {
            title: title,
            text: message,
            icon: msgType,
            confirmButtonText: buttonText,
            timer: 4000
        };
    } else {
        alertData = {
            title: title,
            text: message,
            icon: msgType,
            timer: 4000
        };
    }
    Swal.fire(alertData);
}

async conformationAlert(){
  let flag = false;
  await Swal.fire({
      title: "Are you sure ?",
      //text: "You will not be able to recover this deleted record !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#50cd89',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
  }).then((result) => {
      if (result['isConfirmed']){
          flag = true;
      }
  })
  return flag;
}

async updateAlert(): Promise<boolean>{
    let flag = false;
    await Swal.fire({
      title: 'Are you sure want to update status ?',
      text: 'Please Confirm',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        flag = true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        flag = false;
      }
    })
   
    return flag;
   
  }

}
