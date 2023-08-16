import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { DiscountReason } from 'src/app/model/master/discount-reason.model';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { DiscountReasonService } from 'src/app/service/masters/discount-reason.service';

@Component({
  selector: 'app-fees-structure',
  templateUrl: './fees-structure.component.html',
  styleUrls: ['./fees-structure.component.css']
})
export class FeesStructureComponent {
  actionFlag = true;
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  discountReasonList: Observable<DiscountReason[]> = new Observable();
  formgroup = new FormGroup({
        classCode: new FormControl(),
        enrollmentType: new FormControl(),
        academicYearCode: new FormControl(),
        paymentType: new FormControl(),
        validityStartDate: new FormControl(),
        validityEndDate: new FormControl(),
        remarks: new FormControl(),
        totalFees: new FormControl(),
        discountReasonCode: new FormControl(),
        netAmountAfterDiscount: new FormControl(),
        registrationFees: new FormControl(),
        annualFees: new FormControl(),
        annualFeesDate: new FormControl(),
   })

   constructor(private formBuilder: FormBuilder,
          public validationMsg: ValidationErrorMessageService,
          private classService: ClassService,
          private discountReasonService: DiscountReasonService,
          private academicYearService: AcademicYearService
          ){
   }

   ngOnInit(){
    this.createForm();
    this.customInit();
   }

   createForm() {
    this.formgroup = this.formBuilder.group({
      classCode: [''],
      enrollmentType: [''],
      academicYearCode: [''],
      paymentType: [''],
      validityStartDate: [''],
      validityEndDate: [''],
      remarks: [''],
      totalFees: [''],
      discountReasonCode: [''],
      netAmountAfterDiscount: [''],
      registrationFees: [''],
      annualFees: [''],
      annualFeesDate: [''],
    });
}

customInit(){
  this.loadClass();
  this.loadDiscountReason();
  this.loadAcademicyear();
}

loadClass(){
  this.allClassList = this.classService.getAllClass().pipe(
    map((res)=>{
        return res.data;
    })
)};

loadAcademicyear(){
  this.academicYearList = this.academicYearService.getAllAcademicYear().pipe(
    map((res)=>{
        return res.data;
    })
)};

loadDiscountReason(){
  this.discountReasonList = this.discountReasonService.getAllDiscountReason().pipe(
    map((res)=>{
        return res.data;
    })
)};


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
