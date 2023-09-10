import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { PermissionGroup } from 'src/app/model/master/permission-group.model';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { PermissionGroupService } from 'src/app/service/permission-group.service';

@Component({
  selector: 'app-assign-permission-to-group',
  templateUrl: './assign-permission-to-group.component.html',
  styleUrls: ['./assign-permission-to-group.component.css'],
})
export class AssignPermissionToGroupComponent {

  allPermissionGroupList: Observable<PermissionGroup[]> = new Observable();
  
  formGroup = new FormGroup({
    group : new FormControl(),
    permission : new FormControl(),
})

constructor(private formBuilder: FormBuilder,
  public validationMsg: ValidationErrorMessageService,
  private permissionGroupService: PermissionGroupService,
  ){
}

ngOnInit(){
this.createForm();
this.loadPermissionGroup();
}

createForm() {
  this.formGroup = this.formBuilder.group({
    group: ['', [Validators.required]],
    permission: ['',[Validators.required]],
  });
}

get formControll(){
  return this.formGroup.controls;
}

loadPermissionGroup(){
  this.allPermissionGroupList = this.permissionGroupService.getAllPermissionGroup().pipe(
    map((res)=>{
        return res.data;
    })
)};


  save(){

  }

  resetForm(){

  }


}
