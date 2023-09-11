import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AssignPermissionToGroup } from 'src/app/model/master/assign-permission-to-group.model';
import { PermissionGroup } from 'src/app/model/master/permission-group.model';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AssignPermissionToGroupService } from 'src/app/service/masters/assign-permission-to-group.service';
import { PermissionGroupService } from 'src/app/service/masters/permission-group.service';

@Component({
  selector: 'app-assign-permission-to-group',
  templateUrl: './assign-permission-to-group.component.html',
  styleUrls: ['./assign-permission-to-group.component.css'],
})
export class AssignPermissionToGroupComponent {

  allPermissionGroupList: Observable<PermissionGroup[]> = new Observable();
  sourceList : string[] = [];
  destinationList : string[] = [];
  actionFlag = true;
  
  formGroup = new FormGroup({
    id: new FormControl(),
    group : new FormControl(),
    permission : new FormControl(),
})

constructor(private formBuilder: FormBuilder,
  public validationMsg: ValidationErrorMessageService,
  private permissionGroupService: PermissionGroupService,
  private assignPermissionToGroupService: AssignPermissionToGroupService,
  ){
}

ngOnInit(){
this.createForm(new AssignPermissionToGroup());
this.loadPermissionGroup();
// Filter the data
this.assignPermissionToGroupService.filterKeyword();
// Subscribe to sourceListData$ changes
this.assignPermissionToGroupService.sourceListData$.subscribe((data) => {
  this.sourceList = data;
});

}

createForm(assignPermissionToGroupModel: AssignPermissionToGroup) {
  this.formGroup = this.formBuilder.group({
    id: [assignPermissionToGroupModel.id],
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

// Handle the drop event
drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    // If the item is dropped into a different container, move it
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
  console.log(this.sourceList);
  console.log(this.destinationList);
}

// Function to transfer all items from sourceList to destinationList
giveAllPermissions() {
  // Transfer all items from sourceList to destinationList
  this.sourceList.forEach((item) => {
    this.destinationList.push(item);
  });

  // Clear the sourceList
  this.sourceList = [];
}

// Function to transfer all items from sourceList to destinationList
denyAllPermissions() {
  // Transfer all items from sourceList to destinationList
  this.destinationList.forEach((item) => {
    this.sourceList.push(item);
  });

  // Clear the sourceList
  this.destinationList = [];
}

  save(){

  }

 // Function to reset the lists
 resetLists() {
  // Move all items from destinationList back to sourceList
  while (this.destinationList.length > 0) {
    transferArrayItem(
      this.destinationList,
      this.sourceList,
      0,
      this.sourceList.length
    );
  }

  // Clear the destinationList
  this.destinationList = [];
}


}
