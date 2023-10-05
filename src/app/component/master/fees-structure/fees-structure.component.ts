import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { DiscountReason } from 'src/app/model/master/discount-reason.model';
import { FeesStructure } from 'src/app/model/master/fees-structure.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { PermissionService } from 'src/app/service/common/permission.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { DiscountReasonService } from 'src/app/service/masters/discount-reason.service';
import { FeesStructureService } from 'src/app/service/masters/fees-structure.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-fees-structure',
  templateUrl: './fees-structure.component.html',
  styleUrls: ['./fees-structure.component.css']
})
export class FeesStructureComponent {

  editable: boolean;
  actionFlag = true;
  dtOptions: any = {};

  feesStructureModel: FeesStructure = new  FeesStructure();
  posts: Observable<ResponseModel> = new Observable();
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  discountReasonList: Observable<DiscountReason[]> = new Observable();
  formgroup = new FormGroup({
        id: new FormControl(),
        classCode: new FormControl(),
       // enrollmentType: new FormControl(),
        academicYearCode: new FormControl(),
        //paymentType: new FormControl(),
        //validityStartDate: new FormControl(),
        //validityEndDate: new FormControl(),
        //remarks: new FormControl(),
        totalFees: new FormControl(),
        discountReasonCode: new FormControl(),
        discountAmount: new FormControl(),
        netAmountAfterDiscount: new FormControl(),
        registrationFees: new FormControl(),
        annualFees: new FormControl(),
        //annualFeesDate: new FormControl(),
        lumpsumAmount: new FormControl(),

        installmentNo1: new FormControl(),
        installmentDate1: new FormControl(),
        installmentAmount1: new FormControl(),

        installmentNo2: new FormControl(),
        installmentDate2: new FormControl(),
        installmentAmount2: new FormControl(),

        installmentNo3: new FormControl(),
        installmentDate3: new FormControl(),
        installmentAmount3: new FormControl(),

        installmentNo4: new FormControl(),
        installmentDate4: new FormControl(),
        installmentAmount4: new FormControl(),

        installmentNo5: new FormControl(),
        installmentDate5: new FormControl(),
        installmentAmount5: new FormControl(),

        installmentNo6: new FormControl(),
        installmentDate6: new FormControl(),
        installmentAmount6: new FormControl(),
   })

   constructor(private formBuilder: FormBuilder,
          public validationMsg: ValidationErrorMessageService,
          private classService: ClassService,
          private discountReasonService: DiscountReasonService,
          private academicYearService: AcademicYearService,
          private feesStructureService: FeesStructureService,
          private permissionService: PermissionService,
          private router: Router,
          private alertService: SweetAlertService,
          ){
   }

   ngOnInit(){
    this.createForm(new FeesStructure());
    this.editable = this.permissionService.updateEditableValue(this.router.url);
    this.customInit();
  }

   createForm(feeStructure: FeesStructure) {
    this.formgroup = this.formBuilder.group({
      id: [feeStructure.id],
      classCode: [feeStructure.classCode,[Validators.required]],
      //enrollmentType: [feeStructure.enrollmentType,[Validators.required]],
      academicYearCode: [feeStructure.academicYearCode,[Validators.required]],
      //paymentType: [feeStructure.paymentType,[Validators.required]],
      //validityStartDate: [feeStructure.validityStartDate,[Validators.required]],
      //validityEndDate: [feeStructure.validityEndDate,[Validators.required]],
      //remarks: [feeStructure.remarks,[Validators.minLength(3), Validators.maxLength(150), CustomValidation.alphabetsWithSpace]],
      totalFees: [feeStructure.totalFees,[Validators.required, Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      discountReasonCode: [feeStructure.discountReasonCode],
      discountAmount: [feeStructure.annualFees,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]], 
      netAmountAfterDiscount: [feeStructure.discountAmount,[Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      registrationFees: [feeStructure.registrationFees,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      annualFees: [feeStructure.annualFees,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      //annualFeesDate: [feeStructure.annualFeesDate, [Validators.required]],
      lumpsumAmount: [feeStructure.lumpsumAmount,[Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],

      installmentNo1: [{value: feeStructure.installmentNo1, disabled: true}],
      installmentDate1: [feeStructure.installmentDate1],
      installmentAmount1: [feeStructure.installmentAmount1,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],

      installmentNo2: [{value: feeStructure.installmentNo2, disabled: true}],
      installmentDate2: [feeStructure.installmentDate2],
      installmentAmount2: [feeStructure.installmentAmount2,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],

      installmentNo3: [{value: feeStructure.installmentNo3, disabled: true}],
      installmentDate3: [feeStructure.installmentDate3],
      installmentAmount3: [feeStructure.installmentAmount3,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],

      installmentNo4: [{value: feeStructure.installmentNo4, disabled: true}],
      installmentDate4: [feeStructure.installmentDate4],
      installmentAmount4: [feeStructure.installmentAmount4,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],

      installmentNo5: [{value: feeStructure.installmentNo5, disabled: true}],
      installmentDate5: [feeStructure.installmentDate5],
      installmentAmount5: [feeStructure.installmentAmount5,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],

      installmentNo6: [{value: feeStructure.installmentNo6, disabled: true}],
      installmentDate6: [feeStructure.installmentDate6],
      installmentAmount6: [feeStructure.installmentAmount6,[Validators.required ,Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
    })
  }

  //load the table
  loadTable() {
    this.dtOptions = {
      processing: true,
      scrollY: "300px",
      scrollCollapse: true,
      dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"lip><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
  }
  
  //get the current route and use it for managing the editable value
  private updateEditableValue(): void {
    const currentRoute = this.router.url.substring(1); // Remove the leading '/'
    const cleanedRoute = currentRoute.replace('navmenu/', ''); // Remove 'navmenu/' prefix
    this.editable = this.permissionService.getEditableValue(cleanedRoute);
  }

  customInit() {
    this.loadTable();
    this.getTableRecord();
    this.loadClass();
    this.loadDiscountReason();
    this.loadAcademicyear();
  }

  loadClass() {
    this.allClassList = this.classService.getAllClass().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  loadAcademicyear() {
    this.academicYearList = this.academicYearService.getAllAcademicYear().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

loadDiscountReason(){
  this.discountReasonList = this.discountReasonService.getAllDiscountReason().pipe(
    map((res)=>{
      console.log(res.data);
      
        return res.data;
      })
    )
  };

get formControll(){
  return this.formgroup.controls;
}

save(){
  this.feesStructureModel = {...this.feesStructureModel,...this.formgroup.value}
  try{
          this.feesStructureService.insertFeesStructure(this.feesStructureModel).subscribe(res=>{
            if(res.status === msgTypes.SUCCESS_MESSAGE)
            this.getTableRecord();
            this.resetForm();
          });
    }catch(error){}
}

getTableRecord(){
    this.posts = this.feesStructureService.getAllFeesStructure();
}

 //change the status
 async slideToggleChange(element: MatSlideToggleChange, data: FeesStructure) {
  const flag = await this.alertService.updateAlert()
  if (flag) {
    data.active = !data.active;
    this.feesStructureService.insertFeesStructure(data).subscribe();
  } else {
    element.source.checked = data.active;
  }
}

//set value in formfield to update
setValueToUpdate(data: FeesStructure) {
  this.createForm(data);
  this.actionFlag = false;
}

//update the record
update() {
  this.feesStructureModel = { ...this.feesStructureModel, ...this.formgroup.value }
  this.feesStructureService.insertFeesStructure(this.feesStructureModel).subscribe((res) => {
    if (res.status === msgTypes.SUCCESS_MESSAGE) {
      this.getTableRecord();
      this.resetForm();
    }
  });
}


resetForm(){
  this.createForm(new FeesStructure())
}
}
