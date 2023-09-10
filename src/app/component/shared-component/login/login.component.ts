import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { msgTypes } from 'src/app/constants/common/msgType';
import { routeType } from 'src/app/constants/common/routeType';
import { Auth } from 'src/app/model/auth.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
          private router: Router,
          private formBuilder: FormBuilder,
          public  errorMsgService: ValidationErrorMessageService,
          private authService: AuthService,
          private sweetAlertService: SweetAlertService,
          private httpClient: HttpClient,
  ) { }

  email!: string;
  password!: string;
  authModel: Auth =new Auth();
  ipAddress: string ='';
  showPassword = false;

  loginForm = new FormGroup({
    roles: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  })

  ngOnInit(){
      this.createForm();
      this.loginForm.reset();
      //this.getIPAddress();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      roles: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50), CustomValidation.secretKey]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32), CustomValidation.secretKey]],
    });
  }

  get loginFormControl(){
    return this.loginForm.controls;
  }

  login() : void {
    //this.router.navigate([routeType.DASHBOARD]);
    let data = this.preparedata();
    this.authService.authanticate(data).subscribe((res: any)=>{
      if(res.username === data.email){
        this.router.navigate([routeType.DASHBOARD]);
        //const encryptedUserType = this.authService.getEncryptText(res.roles);
        //localStorage.setItem('userType', JSON.stringify(encryptedUserType) );
        
        // const encryptdState = this.authService.getEncryptText(res.authanticate);
        // localStorage.setItem(msgTypes.STATE, JSON.stringify(encryptdState));
        
       // this.authService.generateToken().subscribe((token: any)=>{
        //const encryptedAccessToken = this.authService.getEncryptText(res.jwtToken)
          localStorage.setItem('access_token', res.jwtToken)
        //})

        this.sweetAlertService.showAlert(msgTypes.SUCCESS_MESSAGE, msgTypes.LOGIN_MESSAGE, msgTypes.SUCCESS, msgTypes.OK_KEY);
       }else{
        this.sweetAlertService.showAlert(msgTypes.ERROR_MESSAGE, msgTypes.INVALID_CREDENTIALS, msgTypes.ERROR, msgTypes.OK_KEY);
      }
    });

    
  }

  preparedata(){
    this.authModel.email = this.loginFormControl.email.value;
    this.authModel.password = this.loginFormControl.password.value;
    this.authModel.roles = this.loginFormControl.roles.value;
    return this.authModel;
  }
  
 // For Hide/Show Password Field
 toggleShowPassword() {
  this.showPassword = !this.showPassword;
}

  // getIPAddress()
  // {
  //   this.httpClient.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
  //     this.ipAddress = res.ip;
      
  //   });
  // }
}
