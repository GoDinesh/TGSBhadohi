import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { msgTypes } from 'src/app/constants/common/msgType';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { CustomValidation } from 'src/app/validators/customValidation';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-api-master',
  templateUrl: './api-master.component.html',
  styleUrls: ['./api-master.component.css']
})
export class ApiMasterComponent {
  fileList: any = [];
  response : any;
  apiForm = new FormGroup({
    fileName: new FormControl(),
    details: new FormControl(),
    httpMethod: new FormControl(),
    url: new FormControl(),
    description: new FormControl(),
    request: new FormControl(),
    response: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    public errorMsgService: ValidationErrorMessageService,
    private sweetAlertService: SweetAlertService
  ){}

  ngOnInit(){
    this.initForm()
  }

  initForm(){
  //  this.createForm(this.apiDetailsModel);
   
  }

  // createForm(apiDetails: any) {
  //   this.apiForm = this.formBuilder.group({
  //         fileName: [apiDetails.fileName,[Validators.required]],
  //         details: [apiDetails.details, [ Validators.minLength(2), CustomValidation.secretKey]],
  //         httpMethod: [apiDetails.httpMethod, [Validators.required, Validators.minLength(2), CustomValidation.secretKey]],
  //         url: [apiDetails.url, [Validators.required, Validators.minLength(2), CustomValidation.secretKey]],
  //         description: [apiDetails.description, [ Validators.minLength(2), CustomValidation.secretKey]],
  //         request: [apiDetails.request, [Validators.required, Validators.minLength(2), CustomValidation.secretKey]],
  //         response: [apiDetails.response, [Validators.required, Validators.minLength(2), CustomValidation.secretKey]],
  //   });
  // }
  
  get apiFormControl(){
    return this.apiForm.controls;
  }




  resetForm(){
    this.apiForm.reset();
  } 

 }
