import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pendingfees-of-all-class',
  templateUrl: './pendingfees-of-all-class.component.html',
  styleUrls: ['./pendingfees-of-all-class.component.css']
})
export class PendingfeesOfAllClassComponent {
  Highcharts: typeof Highcharts = Highcharts;
  
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'column'
    }]
  };

 onInit(){

 }

}
