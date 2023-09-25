import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { msgTypes } from 'src/app/constants/common/msgType';
import { DiscountReason } from 'src/app/model/master/discount-reason.model';
import { PermissionService } from 'src/app/service/common/permission.service';
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
  discountReasonModel: DiscountReason = new DiscountReason();
  dataSource = new MatTableDataSource<DiscountReason>();
  dtOptions: any = {};
  posts: Observable<DiscountReason[]> = new Observable();
  actionFlag = true;
  editable: boolean;

  formgroup = new FormGroup({
   // discountReasonCode    : new FormControl(),
    discountReasonCode: new FormControl(),
    discountReason: new FormControl(),
    active: new FormControl(),
  });

  //Constructor
  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private discountReasonService: DiscountReasonService,
    private alerService: SweetAlertService,
    private permissionService: PermissionService,
    private router: Router) {

    // Listen to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateEditableValue();
      }
    });
  }
  //load ngOnInit
  ngOnInit() {
    this.createForm(new DiscountReason);
    this.updateEditableValue();
    this.customInit();
  }

  async customInit() {
    this.loadTable();
    await this.getTableRecord();
  }

  //get the current route and use it for managing the editable value
  private updateEditableValue(): void {
    const currentRoute = this.router.url.substring(1); // Remove the leading '/'
    const cleanedRoute = currentRoute.replace('navmenu/', ''); // Remove 'navmenu/' prefix
    this.editable = this.permissionService.getEditableValue(cleanedRoute);
  }

  createForm(discountReason: DiscountReason) {
      this.formgroup = this.formBuilder.group({
            discountReasonCode: [discountReason.discountReasonCode],
            discountReason: [discountReason.discountReason,[Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
            //discountReasonCode: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(5), CustomValidation.alphanumaric]],
            active: [discountReason.active,[Validators.required]]
      });
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

  //To get record list
  // async getTableRecord() {
  //     this.discountReasonService.getAllDiscountReason().subscribe(res=>{
  //         if(res.status === msgTypes.SUCCESS_MESSAGE){
  //           this.posts = res.data;
  //         }
  //     });
  // }

  async getTableRecord() {
    this.posts = this.discountReasonService.getAllDiscountReason().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  //get formcontroll
  get formControll() {
    return this.formgroup.controls;
  }

  save() {
    this.discountReasonModel = { ...this.discountReasonModel, ...this.formgroup.value }
    try {
      this.discountReasonService.insertDiscountReason(this.discountReasonModel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE)
          this.getTableRecord();
        this.resetForm();
      });
    } catch (error) { }
  }



  resetForm() {
    this.createForm(new DiscountReason())
    this.actionFlag = true;
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: DiscountReason) {
    const flag = await this.alerService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.discountReasonService.insertDiscountReason(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }

  //set value in formfield to update
  setVlaueToUpdate(data: DiscountReason) {
    this.createForm(data);
    this.actionFlag = false;
  }

  //update the record
  update() {
    this.discountReasonModel = { ...this.discountReasonModel, ...this.formgroup.value }
    this.discountReasonService.insertDiscountReason(this.discountReasonModel).subscribe((res) => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.getTableRecord();
        this.resetForm();
      }
    });
  }

}
