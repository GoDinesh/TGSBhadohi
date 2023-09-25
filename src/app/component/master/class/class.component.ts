import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Class } from 'src/app/model/master/class.model';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { ClassService } from 'src/app/service/masters/class.service';
import { CustomValidation } from 'src/app/validators/customValidation';
import { AfterViewInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { PermissionService } from 'src/app/service/common/permission.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {
  classmodel: Class = new Class();
  dataSource = new MatTableDataSource<Class>();
  dtOptions: any = {};
  posts: Observable<Class[]> = new Observable();;
  actionFlag = true;
  editable: boolean;

  formgroup = new FormGroup({
    id: new FormControl(),
    className: new FormControl(),
    classCode: new FormControl(),
    active: new FormControl(),
  });

  //Constructor
  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private classService: ClassService,
    private alertService: SweetAlertService,
    private cdr: ChangeDetectorRef,
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
    this.createForm(new Class());
    this.updateEditableValue();
    this.customInit();
    this.loadTable();
  }

  async customInit() {
    await this.getTableRecord();
  }

  //get the current route and use it for managing the editable value
  private updateEditableValue(): void {
    const currentRoute = this.router.url.substring(1); // Remove the leading '/'
    const cleanedRoute = currentRoute.replace('navmenu/', ''); // Remove 'navmenu/' prefix
    this.editable = this.permissionService.getEditableValue(cleanedRoute);
  }

  createForm(classModel: Class) {
    this.formgroup = this.formBuilder.group({
      id: [classModel.id],
      className: [classModel.className, [Validators.required, Validators.minLength(3), Validators.maxLength(50), CustomValidation.alphanumaricSpace]],
      classCode: [classModel.classCode, [Validators.required, Validators.minLength(3), Validators.maxLength(5), CustomValidation.alphanumaric]],
      active: [false, [Validators.required]]
    });
  }

  //load the table
  loadTable() {
    this.dtOptions = {
      processing: true,
      // scrollY: "300px",
      scrollCollapse: true,
      dom: '<"align-table-buttons"Bf>rt<"bottom align-table-buttons"lip><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ],
    };
  }

  //To get class list
  // async getTableRecord() {
  //   this.posts = this.classService.getAllClass()
  //   .subscribe(res => {
  //     if (res.status === msgTypes.SUCCESS_MESSAGE) {
  //       this.posts = res.data;
  //       console.log(this.posts)
  //     }
  //   });
  // }

  async getTableRecord() {
    this.posts = this.classService.getAllClass().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  //get formcontroll
  get formControll() {
    return this.formgroup.controls;
  }

  async save() {
    this.classmodel = { ...this.classmodel, ...this.formgroup.value }
    try {
      this.classService.insertClass(this.classmodel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE) {
          this.getTableRecord();
        }
        this.resetForm();
      });
    } catch (error) { }
  }

  resetForm() {
    this.createForm(new Class());
    this.actionFlag = true;
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: Class) {
    const flag = await this.alertService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.classService.insertClass(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }

  //set value in formfield to update
  setValueToUpdate(data: Class) {
    this.createForm(data);
    this.actionFlag = false;
  }

  //update the record
  // update(){
  //     this.classmodel = {...this.classmodel,...this.formgroup.value}
  //     this.classService.insertClass(this.classmodel).subscribe((res)=>{
  //       if(res.status === msgTypes.SUCCESS_MESSAGE){
  //         this.getTableRecord();
  //         this.resetForm();
  //       }
  //     });
  // }
}
