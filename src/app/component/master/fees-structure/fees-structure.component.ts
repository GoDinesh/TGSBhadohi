import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';

@Component({
  selector: 'app-fees-structure',
  templateUrl: './fees-structure.component.html',
  styleUrls: ['./fees-structure.component.css']
})
export class FeesStructureComponent {
  actionFlag = true;

  formgroup = new FormGroup({
    className: new FormControl(),
    enrollmentType: new FormControl(),
    academicYear: new FormControl(),
    paymentType: new FormControl(),
    validityStartDate: new FormControl(),
    validityEndDate: new FormControl(),
    remarks: new FormControl(),
    totalFees: new FormControl(),
    discountReason: new FormControl(),
    netAmountAfterDiscount: new FormControl(),
    registrationFees: new FormControl(),
    annualFees: new FormControl(),
    annualFeesDate: new FormControl(),
   })

   constructor(private formBuilder: FormBuilder,
          public validationMsg: ValidationErrorMessageService,){
            
   }

   ngOnInit(){
    this.createForm();
   }

   createForm() {
    this.formgroup = this.formBuilder.group({
      className: [''],
      enrollmentType: [''],
      academicYear: [''],
      paymentType: [''],
      validityStartDate: [''],
      validityEndDate: [''],
      remarks: [''],
      totalFees: [''],
      discountReason: [''],
      netAmountAfterDiscount: [''],
      registrationFees: [''],
      annualFees: [''],
      annualFeesDate: [''],
    });
}

get formControll(){
  return this.formgroup.controls;
}

save(){

}

update(){
}

resetForm(){

}
}
