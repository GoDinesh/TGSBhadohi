import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { PermissionGroup } from 'src/app/model/master/permission-group.model';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { PermissionGroupService } from 'src/app/service/masters/permission-group.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { msgTypes } from 'src/app/constants/common/msgType';
import { User } from 'src/app/model/master/user.model';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { UserService } from 'src/app/service/masters/user.service';
import { CustomValidation } from 'src/app/validators/customValidation';
import { PermissionService } from 'src/app/service/common/permission.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  allPermissionGroupList: Observable<PermissionGroup[]> = new Observable();

  userModel: User = new User();
  posts: Observable<User[]> = new Observable();
  dtOptions: any = {};
  actionFlag: boolean = true;
  editable: boolean;

  formGroup = new FormGroup({
    id: new FormControl(),
    role: new FormControl(),
    name: new FormControl(),
    groupid: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    active: new FormControl()
  })

  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private permissionGroupService: PermissionGroupService,
    private userService: UserService,
    private alertService: SweetAlertService,
    private permissionService: PermissionService,
    private router: Router,

  ) {

    // Listen to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateEditableValue();
      }
    });
  }

  ngOnInit() {
    this.loadPermissionGroup();
    this.createForm(new User());
    this.updateEditableValue();
    this.loadTable();
    this.getTableRecord();
  }

  //get the current route and use it for managing the editable value
  private updateEditableValue(): void {
    const currentRoute = this.router.url.substring(1); // Remove the leading '/'
    const cleanedRoute = currentRoute.replace('navmenu/', ''); // Remove 'navmenu/' prefix
    this.editable = this.permissionService.getEditableValue(cleanedRoute);
  }

  createForm(usermodel: User) {
    this.formGroup = this.formBuilder.group({
      id: [usermodel.id],
      role: [usermodel.role, [Validators.required]],
      groupid: [usermodel.groupid],
      name: [usermodel.name, [Validators.required]],
      email: [usermodel.email, [Validators.required, CustomValidation.emailId]],
      password: [usermodel.password, [Validators.required, CustomValidation.password]],
      confirmPassword: [usermodel.confirmPassword, [Validators.required, CustomValidation.password]],
      active: [usermodel.active],

    }, { validator: CustomValidation.confirmedValidator('password', 'confirmPassword') });
  }

  get formControll() {
    return this.formGroup.controls;
  }

  loadPermissionGroup() {
    this.allPermissionGroupList = this.permissionGroupService.getAllPermissionGroup().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  // getTableRecord(){
  //   this.userService.getAllUsers().subscribe(res=>{
  //     if(res.status === msgTypes.SUCCESS_MESSAGE){
  //       this.posts = res.data;
  //     }
  // });
  // }
  async getTableRecord() {
    this.posts = this.userService.getAllUsers().pipe(
      map((res) => {
        return res.data;
      })
    )
  };


  //load the table
  loadTable() {
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

  register() {
    this.userModel = { ...this.userModel, ...this.formGroup.value }
    try {
      this.userService.insertUser(this.userModel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE)
          this.getTableRecord();
        this.resetForm();
      });
    } catch (error) { }
  }

  resetForm() {
    this.createForm(new User())
    this.actionFlag = true;
  }

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: User) {
    const flag = await this.alertService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.userService.insertUser(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }

  //set value in formfield to update
  setValueToUpdate(data: User) {
    data.confirmPassword = data.password;
    this.createForm(data);
    console.log(data);
    this.actionFlag = false;
  }

  //update the record
  update() {
    this.userModel = { ...this.userModel, ...this.formGroup.value }
    this.userService.insertUser(this.userModel).subscribe((res) => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.getTableRecord();
        this.resetForm();
      }
    });
  }

}
