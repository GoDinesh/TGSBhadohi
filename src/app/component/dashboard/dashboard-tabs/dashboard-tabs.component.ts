import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent {
  @Input() totalStudents:number;
  @Input() totalBoys:number;
  @Input() totalGirls:number;
  @Input() totalAadharSubmitted:number;
  @Input() totalAadharNotSubmitted:number;
  @Input() cashCollection: number;
  @Input() onlineCollection: number;
  @Input() chequeCollection: number;
  @Input() ssmCollection: number;
  @Input() totalBoysGirlsTab: boolean;
  @Input() aadharNotSubmittedTab: boolean;
  @Input() todayFeesCollectionTab: boolean;
  @Input() birthCertificateTab: boolean;
  @Input() birthCertificateSubmitted:number;
  @Input() birthCertificateNotSubmitted: number;
  

  ngOnInit(){

  }
}
