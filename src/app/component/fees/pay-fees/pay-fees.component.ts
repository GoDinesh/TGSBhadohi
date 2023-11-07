import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Observable, map } from 'rxjs';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Fees } from 'src/app/model/fees/fees.model';
import { StudentFeesStructure } from 'src/app/model/fees/student-fees-structure.model';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { FeesStructure } from 'src/app/model/master/fees-structure.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { Registration } from 'src/app/model/student/registration.model';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { FeesService } from 'src/app/service/fees/fees.service';
import { StudentFeesStructureService } from 'src/app/service/fees/student-fees-structure.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { FeesStructureService } from 'src/app/service/masters/fees-structure.service';
import { RegistrationService } from 'src/app/service/student/registration.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-pay-fees',
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css']
})
export class PayFeesComponent {
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();
  studentList: Observable<ResponseModel> = new Observable();
  registrationModel: Observable<ResponseModel> = new Observable();
  feesModel: Fees = new Fees();

  formgroup = new FormGroup({
    classCode: new FormControl(),
    academicYearCode: new FormControl(),
    registrationNo: new FormControl(),
    amount: new FormControl(),
    paymentMode: new FormControl(),
    paymentDate: new FormControl(),
    paymentReceivedBy: new FormControl()
  });

  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private classService: ClassService,
    private academicYearService: AcademicYearService,
    private registrationService: RegistrationService,
    //private feesStructureService: FeesStructureService,
    private studentFeesStructureService: StudentFeesStructureService,
    private feesService: FeesService, 
  ) {
  }

   //load ngOnInit
   ngOnInit() {
    this.createFeesForm(new Fees());
    this.customInit();
  }

  createFeesForm(fees: Fees) {
    this.formgroup = this.formBuilder.group({
      classCode: [fees.classCode, [Validators.required]],
      academicYearCode: [fees.academicYearCode, [Validators.required]],
      registrationNo:[fees.registrationNo, [Validators.required]],
      amount: [fees.amount,[Validators.required, CustomValidation.amountValidation]],
      paymentMode: [fees.paymentMode, [ Validators.required]],
      paymentDate: [fees.paymentDate, [ Validators.required]],
      paymentReceivedBy: [fees.paymentReceivedBy, []]
    });
  }

 async customInit() {
    this.loadClass();
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

  loadStudentList(){
    const reg = new Registration();
    reg.academicYearCode = this.feesFormControll.academicYearCode.value;
    reg.standard = this.feesFormControll.classCode.value;
    this.studentList = this.registrationService.studentList(reg);
  }

   //get fees formcontroll
   get feesFormControll() {
    return this.formgroup.controls;
  }

  getFeesDetails(){
    const registration: Registration = new Registration();
    registration.academicYearCode = this.feesFormControll.academicYearCode.value;
    registration.standard = this.feesFormControll.classCode.value;
    registration.registrationNo = this.feesFormControll.registrationNo.value;
    this.registrationModel = this.registrationService.studentList(registration);
    this.registrationModel.subscribe(res=>{console.log(res.data)})
  }

  resetForm(){
    this.createFeesForm(new Fees())
  }

  save(){
    this.feesModel = { ...this.feesModel, ...this.formgroup.value }
    try {
      this.feesService.insertFees(this.feesModel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE)
          this.resetForm();
      });
    } catch (error) { }
  }
}
