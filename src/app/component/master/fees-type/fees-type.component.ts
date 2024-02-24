import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { msgTypes } from 'src/app/constants/common/msgType';
import { FeesType } from 'src/app/model/master/fees-type.model';
import { PermissionService } from 'src/app/service/common/permission.service';
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
  //displayedColumns = ["sNo","feesTypeCode","feesType","feesTypeDesc","active"];
  feesTypeModel: FeesType = new FeesType();
  dataSource = new MatTableDataSource<FeesType>();
  dtOptions: any = {};
  posts: Observable<FeesType[]> = new Observable();
  actionFlag = true;
  editable: boolean | undefined;

  formgroup = new FormGroup({
    //feesTypeCode: new FormControl(),
    id: new FormControl(),
    feesType: new FormControl(),
    feesTypeDesc: new FormControl(),
    active: new FormControl(),
  });

  //Constructor
  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private feesTypeService: FeesTypeService,
    private alertService: SweetAlertService,
    private permissionService: PermissionService,
    private router: Router) {
  }
  //load ngOnInit
  ngOnInit() {
    this.createForm(new FeesType());
    this.updateEditable();
    this.customInit();
  }

  async customInit() {
    this.loadTable();
    await this.getTableRecord();
  }

  private updateEditable(): void {
    this.permissionService.updateEditableValue(this.router.url).subscribe((editable) => {
      this.editable = editable;
    });
  }

  createForm(feesType: FeesType) {
    this.formgroup = this.formBuilder.group({
      // feesTypeCode: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(5), CustomValidation.alphanumaric]],
      id: [feesType.id],
      feesType: [feesType.feesType, [Validators.required, Validators.minLength(2), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
      feesTypeDesc: [feesType.feesTypeDesc, [Validators.required, Validators.minLength(5), Validators.maxLength(100), CustomValidation.alphanumaricSpace]],
      active: [feesType.active, [Validators.required]]
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

  //To get table records
  // async getTableRecord() {
  //     this.feesTypeService.getAllFeesType().subscribe(res=>{
  //         if(res.status === msgTypes.SUCCESS_MESSAGE){
  //           this.posts = res.data;
  //         }
  //     });
  // }

  async getTableRecord() {
    this.posts = this.feesTypeService.getAllFeesType().pipe(
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
    this.feesTypeModel = { ...this.feesTypeModel, ...this.formgroup.value }
    try {
      this.feesTypeService.insertFeesType(this.feesTypeModel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE)
          this.getTableRecord();
        this.resetForm();
      });
    } catch (error) { }
  }



  resetForm() {
    this.createForm(new FeesType());
    this.actionFlag = true;
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: FeesType) {
    const flag = await this.alertService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.feesTypeService.insertFeesType(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }

  //set value in formfield to update
  setValueToUpdate(data: FeesType) {
    this.createForm(data);
    this.actionFlag = false;
  }

  //update the record
  update() {
    this.feesTypeModel = { ...this.feesTypeModel, ...this.formgroup.value }
    this.feesTypeService.insertFeesType(this.feesTypeModel).subscribe((res) => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.getTableRecord();
        this.resetForm();
      }
    });
  }

  handleInputChange(formcontrol: FormControl){  
    formcontrol.setValue(formcontrol.value.replace(/\b\w/g, (first:string) => first.toLocaleUpperCase()) );
  }

}
