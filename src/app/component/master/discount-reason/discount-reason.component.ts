import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { msgTypes } from 'src/app/constants/common/msgType';
import { DiscountReason } from 'src/app/model/master/discount-reason.model';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { DiscountReasonService } from 'src/app/service/masters/discount-reason.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-discount-reason',
  templateUrl: './discount-reason.component.html',
  styleUrls: ['./discount-reason.component.css']
})
export class DiscountReasonComponent {

 // displayedColumns = ["sNo","discountReasonCode","discountReason","active"];
  discountReasonModel: DiscountReason = new  DiscountReason();
  dataSource = new MatTableDataSource < DiscountReason > ();
  dtOptions: any = {};
  posts:DiscountReason[]=[];
  actionFlag = true;
  
  formgroup = new FormGroup({
    discountReasonCode    : new FormControl(),
    discountReason: new FormControl(),
    active: new FormControl(),
  });

  //Constructor
  constructor( private formBuilder: FormBuilder,
      public validationMsg: ValidationErrorMessageService,
      private discountReasonService: DiscountReasonService,
      private alerService: SweetAlertService){
  }
  //load ngOnInit
  ngOnInit(){
    this.createForm();
    this.customInit();
  }

  async customInit(){
    this.loadTable();
    await this.getTableRecord();
  }

  createForm() {
      this.formgroup = this.formBuilder.group({
            discountReason: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
            discountReasonCode: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(5), CustomValidation.alphanumaric]],
            active: [false,[Validators.required]]
      });
  }

  //load the table
  loadTable(){
    this.dtOptions = {
      processing: true,
      scrollY: "300px",
      scrollCollapse: true,
      dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
  }

  //To get record list
  async getTableRecord() {
      this.discountReasonService.getAllDiscountReason().subscribe(res=>{
          if(res.status === msgTypes.SUCCESS_MESSAGE){
            this.posts = res.data;
          }
      });
  }

  //get formcontroll
  get formControll(){
    return this.formgroup.controls;
  }

  save(){
    this.discountReasonModel = {...this.discountReasonModel, ...this.formgroup.value}
    try{
            this.discountReasonService.insertDiscountReason(this.discountReasonModel).subscribe(res=>{
              if(res.status === msgTypes.SUCCESS_MESSAGE)
              this.getTableRecord();
              this.resetForm();
            });
      }catch(error){}
  }

  

  resetForm(){
    this.formgroup.reset();
    this.actionFlag = true;
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: DiscountReason) {
    const flag = await this.alerService.updateAlert()
    if(flag)  {
          data.active = !data.active;
          this.discountReasonService.updateDiscountReason(data).subscribe();
    }else{
          element.source.checked = data.active;
    }
  }
  
  //set value in formfield to update
  setVlaueToUpdate(data: DiscountReason){
      this.formgroup.patchValue(data);
      this.actionFlag = false;
      this.discountReasonModel.discountReasonCode = data.discountReasonCode;
    
  }

  //update the record
  update(){
      this.discountReasonModel = {...this.discountReasonModel,...this.formgroup.value}
      this.discountReasonService.updateDiscountReason(this.discountReasonModel).subscribe((res)=>{
        if(res.status === msgTypes.SUCCESS_MESSAGE){
          this.getTableRecord();
          this.resetForm();
        }
      });
  }
 
}
