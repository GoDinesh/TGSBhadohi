import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
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
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { NavigationEnd, Router } from '@angular/router';
import { msgTypes } from 'src/app/constants/common/msgType';

// Define the flat node structure
interface MenuItemFlatNode {
  expandable: boolean;
  level: number;
  text: string;
  icon: string;
  routerLink: string;
  active?: boolean;
  children?: INavbarData[];
  editable?: boolean,
}

@Component({
  selector: 'app-assign-permission-to-group',
  templateUrl: './assign-permission-to-group.component.html',
  styleUrls: ['./assign-permission-to-group.component.css'],
})
export class AssignPermissionToGroupComponent {

  allPermissionGroupList: Observable<PermissionGroup[]> = new Observable();
  actionFlag = true;
  dataSource: MatTreeFlatDataSource<INavbarData, MenuItemFlatNode>;
  selectedItems: MenuItemFlatNode[] = [];
  assignPermissionToGroup: AssignPermissionToGroup = new AssignPermissionToGroup();
  dummy: INavbarData[] = [];
  editable: boolean;

  // we can initialize our checkbox selections here
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
    private alertService: SweetAlertService,
  ) {
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener),
      // Initialize all 'active' properties to false
      // this.dummy = menuListAdmin;
      this.dummy = this.deepClone(menuListAdmin);

    this.setAllActivePropertiesToFalse(this.dummy);
    this.dataSource.data = this.dummy;
  }

  //To set all 'active' properties to false
  setAllActivePropertiesToFalse(nodes: INavbarData[]) {
    this.assignPermissionToGroupService.setAllActivePropertiesToFalse(nodes);
  }

  ngOnInit() {
    this.createForm(new AssignPermissionToGroup());
    this.treeControl.dataNodes.forEach(node => {
      if (node.active) {
        this.checkboxSelections.select(node);
      }
      if (node.editable) {
        this.selectedChips[node.text] = true;
      }
    });
    this.loadPermissionGroup();
  }

  createForm(assignPermissionToGroupModel: AssignPermissionToGroup) {
    this.formGroup = this.formBuilder.group({
      id: [assignPermissionToGroupModel.id],
      groupid: ['', [Validators.required]],
      permission: [''],
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


  async save() {
    const selectedPermission = await this.finalizeSelection();
    if (selectedPermission) {
      this.assignPermissionToGroup = { ...this.assignPermissionToGroup, ...this.formGroup.value }
      this.assignPermissionToGroupService.insertAssignPermissionToGroup(this.assignPermissionToGroup).subscribe((res)=>{
          if(res.status === msgTypes.SUCCESS_MESSAGE){
            this.resetLists();
          }
      })
    }
  }

  // Function to reset the lists
  resetLists() {
    this.actionFlag = true;
    this.checkboxSelections.deselect();
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

    // Update 'active' property for the node and all its descendants
    node.active = this.checkboxSelections.isSelected(node);
    descendants.forEach(descendant => descendant.active = node.active);

    // Force update for the parent
    descendants.forEach(child => this.checkboxSelections.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  menuLeafItemSelectionToggle(node: MenuItemFlatNode): void {
    this.checkboxSelections.toggle(node);
    // Update 'active' property
    node.active = this.checkboxSelections.isSelected(node);
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

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: MenuItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checkboxSelections.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: MenuItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checkboxSelections.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  // Transformer function for flattening the tree
  transformer(node: INavbarData, level: number): MenuItemFlatNode {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      text: node.text,
      icon: node.icon,
      routerLink: node.routerLink,
      children: node.children,
      active: node.active,
      editable: node.editable,
    };
  }

  // Function to get the children of a node (null for leaf nodes)
  getChildren(node: INavbarData): INavbarData[] | null {
    return node.children || null;
  }

  // @ViewChild('outputDiv', { static: false })
  // public outputDivRef: ElementRef<HTMLParagraphElement>;

  // Define a function to create a new structure matching menuListAdmin
  createNewStructure(node: MenuItemFlatNode, treeControl: FlatTreeControl<MenuItemFlatNode>): INavbarData {
    const newNode: INavbarData = {
      text: node.text,
      icon: node.icon,
      routerLink: node.routerLink,
      children: node.children,
      active: node.active,
      editable: node.editable,
    };

    // Get the descendants of the node
    const descendants = treeControl.getDescendants(node);

    // Check if the node has descendants
    if (descendants.length > 0) {
      newNode.children = descendants.map(descendant => this.createNewStructure(descendant, treeControl));
    }

    return newNode;
  }

  //To update 'active' properties in the cloned list based on selection
  updateClonedListBasedOnSelection(clonedNodes: INavbarData[], selectedNodes: any[], selectedChips: { [nodeId: string]: boolean }): boolean {
    return this.assignPermissionToGroupService.updateClonedListBasedOnSelection(clonedNodes, selectedNodes, selectedChips);
  }

  //To clone the original menu list
  deepClone(obj: any) {
    return this.assignPermissionToGroupService.deepClone(obj);
  }

  //To Give All Permissions
  selectAllNodes() {
    this.assignPermissionToGroupService.selectAllNodes(this.treeControl, this.checkboxSelections);
  }

  //To Deny All Permissions
  deselectAllNodes() {
    this.assignPermissionToGroupService.deselectAllNodes(this.treeControl, this.checkboxSelections);
  }
  //To be called after making our selections
  finalizeSelection(): INavbarData[] {
    //const clonedMenuListAdmin = this.deepClone(menuListAdmin);
    this.updateClonedListBasedOnSelection(this.dummy, this.treeControl.dataNodes, this.selectedChips);
    //prepare the new menu list
    const updatedMenuListAdmin = JSON.stringify(this.dummy, null, 2);

    // Display the updated structure in the innerText
    // this.outputDivRef.nativeElement.innerText = 'Updated Menu List Admin:\n' + updatedMenuListAdmin;
    this.formGroup.controls.permission.setValue(updatedMenuListAdmin);
    return this.dummy;
  }

  //Get final lList of allowed permissions 
  getFinalList(): INavbarData[] {
    return this.finalizeSelection();
  }

  //mat-chip code:: begin
  selectedChips: { [nodeId: string]: boolean } = {};

  toggleSelected(nodeId: string, chipKey: boolean) {
    if (this.selectedChips[nodeId] === chipKey) {
      // Deselect if the chip is already selected
      delete this.selectedChips[nodeId];
    } else {
      // Otherwise, select the chip
      this.selectedChips[nodeId] = chipKey;
    }
  }

  isSelected(nodeId: string, chipKey: boolean): boolean {
    return this.selectedChips[nodeId] === chipKey;
  }
  //mat-chip code:: end


  // fetch the permission on selection of role

  // Listen for changes to the 'groupid' form control
  getGroupId() {
    this.fetchPermissionsByRole(this.formGroup.controls.groupid.value);
  }

  fetchPermissionsByRole(roleId: string) {
    // Assume getPermissionsByRole is a service method that fetches permissions based on role
    this.assignPermissionToGroupService.getPermissionsByRole(roleId).subscribe((permissions) => {

      if (permissions.data[0] != null) {
        this.actionFlag = false;
        this.formControll.id.setValue(permissions.data[0].id);
        // Loop through the fetched permissions and update your local menuListAdmin
        this.updateMenuListAdmin(this.dummy, JSON.parse(permissions.data[0].permission));
        // Refresh the tree component

        // Update the dataSource to reflect changes in the UI
        this.dataSource.data = [...this.dummy];

        // Clear previous selections
        this.checkboxSelections.clear();

        // this.treeControl.dataNodes = this.dummy.map(item => {
        //   const flatNode = this.transformer(item, 0);
        //   // Auto-select checkboxes and chips based on 'active' and 'editable'
        //   if (flatNode.active) {
        //     this.checkboxSelections.select(flatNode);
        //   }
        //   if (flatNode.editable) {
        //     this.selectedChips[flatNode.text] = true;
        //   }
        //   return flatNode;
        // });
        this.treeControl.dataNodes.forEach(node => {
          if (node.active) {
            this.checkboxSelections.select(node);
          }
          if (node.editable) {
            this.selectedChips[node.text] = true;
          }
        });
        // Run Angular's change detection
        // this.cdr.detectChanges();
      }
    });
  }

  updateMenuListAdmin(localList: INavbarData[], fetchedList: INavbarData[]) {
    localList.forEach((localItem) => {
      const fetchedItem = fetchedList.find((item) => item.text === localItem.text);
      if (fetchedItem) {
        localItem.active = fetchedItem.active;
        localItem.editable = fetchedItem.editable;
        if (localItem.children && fetchedItem.children) {
          this.updateMenuListAdmin(localItem.children, fetchedItem.children);
        }
      }
    });
  }


}
