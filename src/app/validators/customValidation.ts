
import { FormControl, FormGroup } from "@angular/forms";

export class CustomValidation {

    constructor() { }
  
    static alphabets(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const minLengthValue = 3;
            const maxLengthValue = 50;
            const regex = /^[a-zA-Z ]*$/ ;
            if (fc.value.length < minLengthValue) {
                return ({ minLength: true });
            }
            if (fc.value.length > maxLengthValue) {
                return ({ maxLength: true });
            }
            if (fc.value==='' || regex.test(fc.value)) {
                return (null);
            } else {
                return ({ alphabets: true });
            }
        } else {
            return ({ alphabets: true });
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

    // static maxLength(fc: FormControl) {
    //     if (fc.value != undefined || fc.value != '') {
    //         const maxLengthValue = 50;
    //         if (fc.value.length > maxLengthValue) {
    //             return ({ maxLength: true });
    //         }
    //         else {
    //             return (null);
    //         }
          
    //     } else {
    //         return ({ maxLength: true });
    //     }
    
    // }

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

    

  
  }
  