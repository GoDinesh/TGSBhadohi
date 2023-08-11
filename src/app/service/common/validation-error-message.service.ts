import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { validationMessage } from 'src/app/constants/common/validation-message';

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorMessageService {
  errorMessage = validationMessage;

  getErrorMessage(fc: AbstractControl, prefix: string) {
      if (fc.touched && fc.invalid) {
          if (fc.errors) {
              let data = JSON.stringify(fc.errors);
              data = data.substring(1, data.length - 1)
              let errormsg = '';
              let splt;
              let temp = data;
              if (data.includes(',')) {
                  splt = data.split(',');
                  temp = splt[0];
                  splt = (splt[0].split(':'))
              } else {
                  splt = (data.split(':'))
              }
              errormsg = splt[0].substring(1, splt[0].length - 1)

              let minMaxFlag = false;
              let minMaxNumber = '';
              if (errormsg == 'minlength' || errormsg == 'maxlength') {
                  minMaxFlag = true;
                  const splitTemp = temp.split(':');
                  minMaxNumber = (splitTemp[2])
              }

              for (let i = 0; i < this.errorMessage.length; i++) {
                  if (this.errorMessage[i].key === errormsg) {
                      if (minMaxFlag) {
                          return this.errorMessage[i].value.replace('$', minMaxNumber.toString())
                      } else if (errormsg == 'required') {
                          return this.errorMessage[i].value.replace('$', prefix);
                      }
                      return this.errorMessage[i].value;
                  }
              }
              return '';
          }
          return '';
      }
      return '';
  }
}
