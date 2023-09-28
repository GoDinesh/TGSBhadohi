import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { msgTypes } from 'src/app/constants/common/msgType';
import { PermissionGroup } from 'src/app/model/authorization/permission-group.model';
import { PermissionGroupService } from 'src/app/service/authorization/permission-group.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';

@Component({
  selector: 'app-permission-group',
  templateUrl: './permission-group.component.html',
  styleUrls: ['./permission-group.component.css']
})
export class PermissionGroupComponent {

  permissionGroupModel: PermissionGroup = new PermissionGroup();
  posts: Observable<PermissionGroup[]> = new Observable();
  dataSource = new MatTableDataSource<PermissionGroup>();
  dtOptions: any = {};
  actionFlag = true;
  editable: boolean;

  formGroup = new FormGroup({
    groupid: new FormControl(),
    usergroup: new FormControl(),
    active: new FormControl()
  })

  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private permissionGroupService: PermissionGroupService,
    private alertService: SweetAlertService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.createForm(new PermissionGroup());
    this.customInit();
  }

  async customInit() {
    this.loadTable();
    await this.getTableRecord();
  }

  createForm(permissionGroupModel: PermissionGroup) {
    this.formGroup = this.formBuilder.group({
      groupid: [permissionGroupModel.groupid],
      usergroup: [permissionGroupModel.usergroup, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      active: [permissionGroupModel.active, [Validators.required]]
    });
  }

  get formControll() {
    return this.formGroup.controls;
  }

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

  //To get class list
  // async getTableRecord() {
  //   this.permissionGroupService.getAllPermissionGroup().subscribe(res => {
  //     if (res.status === msgTypes.SUCCESS_MESSAGE) {
  //       this.permissionGroup = res.data;
  //     }
  //   });
  // }
  async getTableRecord() {
    this.posts = this.permissionGroupService.getAllPermissionGroup().pipe(
      map((res) => {
        return res.data;
      })
    )
  };

  //change the status
  async slideToggleChange(element: MatSlideToggleChange, data: PermissionGroup) {
    const flag = await this.alertService.updateAlert()
    if (flag) {
      data.active = !data.active;
      this.permissionGroupService.insertPermissionGroup(data).subscribe();
    } else {
      element.source.checked = data.active;
    }
  }

  save() {
    this.permissionGroupModel = { ...this.permissionGroupModel, ...this.formGroup.value }
    try {
      this.permissionGroupService.insertPermissionGroup(this.permissionGroupModel).subscribe(res => {
        if (res.status === msgTypes.SUCCESS_MESSAGE)
          this.getTableRecord();
        this.resetForm();
      });
    } catch (error) { }
  }

  resetForm() {
    this.createForm(new PermissionGroup());
    this.actionFlag = true;
  }

  //set value in formfield to update
  setValueToUpdate(data: PermissionGroup) {
    this.createForm(data);
    this.actionFlag = false;
  }
}

