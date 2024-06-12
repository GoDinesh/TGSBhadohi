import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-today-collections',
  templateUrl: './today-collections.component.html',
  styleUrls: ['./today-collections.component.css']
})
export class TodayCollectionsComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
 
  dataValue: number[]= [];
  @Input() cashCollection!: number;
  @Input() onlineCollection!: number;
  @Input() chequeCollection!: number;
  @Input() ssmCollection!: number;
  

  constructor(){}

 ngOnInit(){
  this.customOnInit();
 }

 async customOnInit(){
  
}

ngOnChanges(){
 this.initialize();
}

 async initialize(){
  this.chartOptions={
    chart: {
      width: 290,  // Width of the chart
      height: 290  // Height of the chart
    },
    title: {
      text: 'Today Fees Collections',
    },
   plotOptions : {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
   
         dataLabels: {
            enabled: false           
         },
   
         showInLegend: true
      }
   },
   series : [{
      type: 'pie',
      name: 'Fees Collections',
      data: [
         ['Cash',this.cashCollection],
         ['Online',this.onlineCollection],
         ['Cheque',this.chequeCollection],
         ['SSM',this.ssmCollection ]
      ]
   }]
  };


  }


    
 
 }

