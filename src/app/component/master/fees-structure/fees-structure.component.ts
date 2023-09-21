import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { Class } from 'src/app/model/master/class.model';
import { DiscountReason } from 'src/app/model/master/discount-reason.model';
import { PermissionService } from 'src/app/service/common/permission.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { DiscountReasonService } from 'src/app/service/masters/discount-reason.service';
import { CustomValidation } from 'src/app/validators/customValidation';

@Component({
  selector: 'app-fees-structure',
  templateUrl: './fees-structure.component.html',
  styleUrls: ['./fees-structure.component.css']
})
export class FeesStructureComponent {

  editable: boolean;
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
    private academicYearService: AcademicYearService,
    private permissionService: PermissionService,
    private router: Router
  ) {

    // Listen to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateEditableValue();
      }
    });
  }

  ngOnInit() {
    this.createForm();
    this.updateEditableValue();
    this.customInit();
  }

  //get the current route and use it for managing the editable value
  private updateEditableValue(): void {
    const currentRoute = this.router.url.substring(1); // Remove the leading '/'
    const cleanedRoute = currentRoute.replace('navmenu/', ''); // Remove 'navmenu/' prefix
    this.editable = this.permissionService.getEditableValue(cleanedRoute);
  }

  createForm() {
    this.formgroup = this.formBuilder.group({
      classCode: ['', [Validators.required]],
      enrollmentType: ['', [Validators.required]],
      academicYearCode: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
      validityStartDate: ['', [Validators.required]],
      validityEndDate: ['', [Validators.required]],
      remarks: ['', [Validators.minLength(3), Validators.maxLength(150), CustomValidation.alphabetsWithSpace]],
      totalFees: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      discountReasonCode: [''],
      netAmountAfterDiscount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      registrationFees: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      annualFees: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), CustomValidation.amountValidation]],
      annualFeesDate: ['', [Validators.required]],
    });
  }

  customInit() {
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

  loadDiscountReason() {
    this.discountReasonList = this.discountReasonService.getAllDiscountReason().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  get formControll() {
    return this.formgroup.controls;
  }

  save() {

  }

  update() {
  }

  resetForm() {

  }
}
