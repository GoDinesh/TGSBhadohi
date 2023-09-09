import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  formGroup = new FormGroup({
    role: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
})

constructor(private formBuilder: FormBuilder,
  public validationMsg: ValidationErrorMessageService,
  ){
}

ngOnInit(){
this.createForm();
}

createForm() {
  this.formGroup = this.formBuilder.group({
    role: ['',[Validators.required]],
    email: ['',[Validators.required, CustomValidation.emailId]],
    password: ['',[Validators.required, CustomValidation.password]],
    confirmPassword: ['',[Validators.required]],
  },{ validator: CustomValidation.confirmedValidator('password', 'confirmPassword') });
}

get formControll(){
  return this.formGroup.controls;
}

  register(){

  }

  resetForm(){

  }

}
