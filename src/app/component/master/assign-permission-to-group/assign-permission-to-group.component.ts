import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AssignPermissionToGroup } from 'src/app/model/master/assign-permission-to-group.model';
import { PermissionGroup } from 'src/app/model/master/permission-group.model';
import { INavbarData } from 'src/app/model/menu';
import { ValidationErrorMessageService } from 'src/app/service/common/validation-error-message.service';
import { AssignPermissionToGroupService } from 'src/app/service/masters/assign-permission-to-group.service';
import { PermissionGroupService } from 'src/app/service/masters/permission-group.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { menuListAdmin } from 'src/app/constants/common/menu-list-admin';

// Define the flat node structure
interface MenuItemFlatNode {
  expandable: boolean;
  level: number;
  text: string;
  active?: boolean;
}

@Component({
  selector: 'app-assign-permission-to-group',
  templateUrl: './assign-permission-to-group.component.html',
  styleUrls: ['./assign-permission-to-group.component.css'],
})
export class AssignPermissionToGroupComponent {

  allPermissionGroupList: Observable<PermissionGroup[]> = new Observable();
  sourceList: string[] = [];
  destinationList: string[] = [];
  actionFlag = true;
  dataSource: MatTreeFlatDataSource<INavbarData, MenuItemFlatNode>;
  selectedItems: MenuItemFlatNode[] = [];


  // You can initialize your checkbox selections here
  checkboxSelections: SelectionModel<MenuItemFlatNode> = new SelectionModel<MenuItemFlatNode>(true);

  // Flat tree data source and flattener
  treeControl = new FlatTreeControl<MenuItemFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener<INavbarData, MenuItemFlatNode>(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => this.getChildren(node)
  );

  formGroup = new FormGroup({
    id: new FormControl(),
    groupid: new FormControl(),
    permission: new FormControl(),
  })

  constructor(private formBuilder: FormBuilder,
    public validationMsg: ValidationErrorMessageService,
    private permissionGroupService: PermissionGroupService,
    private assignPermissionToGroupService: AssignPermissionToGroupService,
  ) {
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener),
      this.dataSource.data = menuListAdmin;
  }

  ngOnInit() {
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
      groupid: ['', [Validators.required]],
      permission: ['', [Validators.required]],
    });
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

  // // Handle the drop event
  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     // If the item is dropped into a different container, move it
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  //   console.log(this.sourceList);
  //   console.log(this.destinationList);
  // }

  // Function to transfer all items from sourceList to destinationList
  giveAllPermissions() {
    // // Transfer all items from sourceList to destinationList
    // this.sourceList.forEach((item) => {
    //   this.destinationList.push(item);
    // });

    // // Clear the sourceList
    // this.sourceList = [];
  }

  // Function to transfer all items from sourceList to destinationList
  denyAllPermissions() {
    // // Transfer all items from sourceList to destinationList
    // this.destinationList.forEach((item) => {
    //   this.sourceList.push(item);
    // });

    // // Clear the sourceList
    // this.destinationList = [];
  }

  save() {

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

  getLevel = (node: MenuItemFlatNode) => node.level;
  // Function to handle checkbox toggles
  handleCheckboxToggle(node: MenuItemFlatNode) {
    this.checkboxSelections.toggle(node);
  }

  hasChild = (_: number, _nodeData: MenuItemFlatNode) => _nodeData.expandable;
  hasNoContent = (_: number, _nodeData: MenuItemFlatNode) => _nodeData.text === '';

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  menuItemSelectionToggle(node: MenuItemFlatNode): void {
    this.checkboxSelections.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checkboxSelections.isSelected(node)
      ? this.checkboxSelections.select(...descendants)
      : this.checkboxSelections.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checkboxSelections.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  menuLeafItemSelectionToggle(node: MenuItemFlatNode): void {
    this.checkboxSelections.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: MenuItemFlatNode): void {
    let parent: MenuItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: MenuItemFlatNode): void {
    const nodeSelected = this.checkboxSelections.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checkboxSelections.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checkboxSelections.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checkboxSelections.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: MenuItemFlatNode): MenuItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  // Function to determine whether all descendants are selected
  descendantsAllSelected(node: MenuItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every((child) => this.checkboxSelections.isSelected(child));
  }

  // Function to determine whether part of the descendants are selected
  descendantsPartiallySelected(node: MenuItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    console.log(descendants);
    const fff =  descendants.some((child) => this.checkboxSelections.isSelected(child));
    console.log(fff);
    return fff;
    
   
    
  }

  // Transformer function for flattening the tree
  transformer(node: INavbarData, level: number): MenuItemFlatNode {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      text: node.text,
    };
  }

  // Function to get the children of a node (null for leaf nodes)
  getChildren(node: INavbarData): INavbarData[] | null {
    return node.children || null;
  }

  @ViewChild('outputDiv', {static: false}) 
public outputDivRef: ElementRef<HTMLParagraphElement>;
  getSelectedItems(node: MenuItemFlatNode) {
    // Check if the current node is selected and add it to the selectedItems array if it is.
    if (this.checkboxSelections.isSelected(node)) {
      this.selectedItems.push(node);
      console.log(this.selectedItems)
    }
  
    // Recursively traverse the descendants.
    const descendants = this.treeControl.getDescendants(node);
    descendants.forEach((child) => {
      this.getSelectedItems(child);
    });

    this.outputDivRef.nativeElement.innerText = 'You ' 
    + (this.selectedItems.length > 0 
      ? 'selected ' + this.selectedItems.forEach(item => item.text) 
      : 'have not made a selection')
    + '.';
  }

}
