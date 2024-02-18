
import { FormControl, FormGroup } from "@angular/forms";

export class CustomValidation {

    constructor() { }
  
    static alphabets(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex = /^[a-zA-Z ]*$/ ;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({ alphabets: true });
            }
        } else {
            return ({ alphabets: true });
        }
    }

    static alphabetsWithSpace(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
            
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({ alphabetsWithSpace: true });
            }
        } else {
            return ({ alphabetsWithSpace: true });
        }
    }

    static alphanumaric(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex = /^[a-zA-Z0-9]*$/ ;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({ alphanumaric: true });
            }
        } else {
            return ({ alphanumaric: true });
        }
    }

    static alphanumaricSpace(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex = /^[a-z0-9]+([-_\s]{1}[a-z0-9]+)*$/i ;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({ alphanumaricSpace: true });
            }
        } else {
            return ({ alphanumaricSpace: true });
        }
    }

    static academicYear(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex = /^[0-9]{4}[-][0-9]{4}$/ ;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({ academicYear: true });
            }
        } else {
            return ({ academicYear: true });
        }
    }

    static numeric(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex = /^[0-9]*$/ ;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({ numeric: true });
            }
        } else {
            return ({ numeric: true });
        }
    }

    static secretKey(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex=/^[^<>]{0,}$/;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({secretKey: true });
            }
        } else {
            return ({ secretKey: true });
        }
    }

    static plainText(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex=/^[^<>$]{0,}$/;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({plainText: true });
            }
        } else {
            return ({ plainText: true });
        }
    }


    // static minLength(fc: FormControl) {
    //     if (fc.value != undefined || fc.value != '') {
    //         const minLengthValue = 3;
    //         if (fc.value.length < minLengthValue) {
    //             return ({ minLength: true });
    //         }
    //         else {
    //             return (null);
    //         }
          
    //     } else {
    //         return ({ minLength: true });
    //     }
    
    // }

    static emailId(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            }
            else {
                return ({emailId: true});
            }
          
        } else {
            return ({emailId: true});
        }
    
    }

    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    static password(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
          if (fc.value === '' || regex.test(fc.value)) {
            return null;
          } else {
            return { invalidPassword: true };
          }
        } else {
          return { invalidPassword: true };
        }
      }

      static confirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
        //   if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        //     return;
        //   }
          if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
          } else {
            matchingControl.setErrors(null);
          }
        };
      }

    static aadhaarValidation(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex=/^[0-9]{4}[0-9]{4}[0-9]{4}$/;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({aadhaarValidation: true });
            }
        } else {
            return ({ aadhaarValidation: true });
        }
    }

    static fileTypeValidator(fc: FormControl) {
        const file = fc.value;
        if (file) {
          const allowedExtensions = ['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png', 'gif'];
          const fileExtension = file.name.split('.').pop().toLowerCase();
          if (!allowedExtensions.includes(fileExtension)) {
            return ({ fileTypeValidator: true });
          }
        }
        return (null);
    }


    static amountValidation(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex=/^\d+(\.\d{1,2})?$/;
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({amountValidation: true });
            }
        } else {
            return ({ amountValidation: true });
        }
    }
    

      
    

  
  }
  