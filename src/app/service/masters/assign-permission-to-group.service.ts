import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { INavbarData } from 'src/app/model/menu';

@Injectable({
  providedIn: 'root'
})
export class AssignPermissionToGroupService {

  constructor() { }

  setAllActivePropertiesToFalse(nodes: INavbarData[]) {
    nodes.forEach(node => {
      node.active = false;
      if (node.children) {
        this.setAllActivePropertiesToFalse(node.children);
      }
    });
  }

  updateClonedListBasedOnSelection(clonedNodes: INavbarData[], selectedNodes: any[]): boolean {
    let anyChildActive = false;
    clonedNodes.forEach(node => {
      const correspondingFlatNode = selectedNodes.find(
        selectedNode => selectedNode.text === node.text
      );
      node.active = !!correspondingFlatNode?.active;

      if (node.children) {
        const childActive = this.updateClonedListBasedOnSelection(node.children, selectedNodes);
        if (childActive) {
          node.active = true;
        }
      }

      if (node.active) {
        anyChildActive = true;
      }
    });
    return anyChildActive;
  }

  deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  selectAllNodes(treeControl: FlatTreeControl<any>, checkboxSelections: SelectionModel<any>) {
    treeControl.dataNodes.forEach(node => {
      checkboxSelections.select(node);
      node.active = true;
    });
  }

  deselectAllNodes(treeControl: FlatTreeControl<any>, checkboxSelections: SelectionModel<any>) {
    treeControl.dataNodes.forEach(node => {
      checkboxSelections.deselect(node);
      node.active = false;
    });
  }
}

