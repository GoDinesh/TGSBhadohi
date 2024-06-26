import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Observable, forkJoin } from 'rxjs';
import { Fees } from 'src/app/model/fees/fees.model';
import { Class } from 'src/app/model/master/class.model';
import { Registration } from 'src/app/model/student/registration.model';
import { FeesService } from 'src/app/service/fees/fees.service';
import { ClassService } from 'src/app/service/masters/class.service';

@Component({
  selector: 'app-pendingfees-of-all-class',
  templateUrl: './pendingfees-of-all-class.component.html',
  styleUrls: ['./pendingfees-of-all-class.component.css']
})
export class PendingfeesOfAllClassComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  constructor(private feesService: FeesService
  ){}

 ngOnInit(){
      this.loadData();
 }

 loadData(){
  const reg: Registration = new Registration();
  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear();
  if(month>3)
    reg.academicYearCode = year.toString()+(year+1).toString();  
  else
    reg.academicYearCode = (year-1).toString()+year;
  
  reg.temp = month.toString();  

  this.feesService.getTotalPendingFeesClassWise(reg).subscribe(res=>{
    const dataValue=[];
    const categories=[];
   for(let i=0;i<res.data.length;i++){
      const val = res.data[i].split("#");
      categories.push(val[0]);
      dataValue.push(Number(val[1]));
   }

    this.chartOptions = {
      chart: {
        width: 380,  // Width of the chart
        height: 290  // Height of the chart
      },
      title: {
        text: 'Pending Fees Class Wise',
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: 'Pending Amount'
        }
      },
      series: [{
        type: 'column',
        name: 'Pending Fees',
        data: dataValue,
      },
     
      ]
    };
    
  });

 }

 }
