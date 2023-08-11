import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { msgTypes } from 'src/app/constants/common/msgType';
import { FeesType } from 'src/app/model/master/fees-type.model';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { FeesTypeService } from 'src/app/service/masters/fees-type.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-fees-type',
  templateUrl: './fees-type.component.html',
  styleUrls: ['./fees-type.component.css']
})
export class FeesTypeComponent {
  displayedColumns = ["sNo","feesTypeCode","feesType","feesTypeDesc","active"];
  feesTypeModel: FeesType = new  FeesType();
  dataSource = new MatTableDataSource < FeesType > ();
  dtOptions: any = {};
  posts: FeesType[]=[];
  actionFlag = true;
  
  formgroup = new FormGroup({
      feesTypeCode: new FormControl(),
      feesType: new FormControl(),
      feesTypeDesc: new FormControl(),
      active: new FormControl(),
  });

  //Constructor
  constructor( private formBuilder: FormBuilder,
      public validationMsg: ValidationErrorMessageService,
      private feesTypeService: FeesTypeService,
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
            feesTypeCode: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(5), CustomValidation.alphanumaric]],
            feesType: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
            feesTypeDesc: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(100), CustomValidation.alphanumaricSpace]],
            active: [false,[Validators.required]]
      });
  }

  //load the table
  loadTable(){
      this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            scrollY: "300px",
            scrollCollapse: true,
            dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"lip><"clear">',
            buttons: [
              'copy', 'csv', 'excel', 'print'
            ]
      };
  }

  //To get table records
  async getTableRecord() {
      this.feesTypeService.getAllFeesType().subscribe(res=>{
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
    this.feesTypeModel = {...this.feesTypeModel,...this.formgroup.value}
    try{
            this.feesTypeService.insertFeesType(this.feesTypeModel).subscribe(res=>{
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
  async slideToggleChange(element: MatSlideToggleChange, data: FeesType) {
    const flag = await this.alerService.updateAlert()
    if(flag)  {
          data.active = !data.active;
          this.feesTypeService.updateFeesType(data).subscribe();
    }else{
          element.source.checked = data.active;
    }
  }
  
  //set value in formfield to update
  setVlaueToUpdate(data: FeesType){
      this.formgroup.patchValue(data);
      this.actionFlag = false;
      this.feesTypeModel.feesTypeCode = data.feesTypeCode;
  }

  //update the record
  update(){
      this.feesTypeModel = {...this.feesTypeModel,...this.formgroup.value}
      this.feesTypeService.updateFeesType(this.feesTypeModel).subscribe((res)=>{
        if(res.status === msgTypes.SUCCESS_MESSAGE){
          this.getTableRecord();
          this.resetForm();
        }
      });
  } 
   
}
