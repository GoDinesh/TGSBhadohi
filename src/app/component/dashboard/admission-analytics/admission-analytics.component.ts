import { Component, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as $ from 'jquery';
import { StudentDetailsModalComponent } from '../student-details-modal/student-details-modal.component';


@Component({
  selector: 'app-admission-analytics',
  templateUrl: './admission-analytics.component.html',
  styleUrls: ['./admission-analytics.component.css']
})
export class AdmissionAnalyticsComponent {
  @ViewChild(StudentDetailsModalComponent) private modalComponent: StudentDetailsModalComponent;

  type = 'column2d';
  width = '600';
  height = '400';
  data = {
    chart: {
      caption: "Student Admissions by Session",
      subCaption: "For the academic year 2022-2023",
      xAxisName: "Session",
      yAxisName: "Number of Admissions",
      numberSuffix: "",
      theme: "fusion"
    },
    data: [
      { label: "Session 1", value: "50" },
      { label: "Session 2", value: "30" },
      { label: "Session 3", value: "20" }
    ]
  };

  Highcharts: typeof Highcharts = Highcharts;
  selectedYear: string;
  selectedStudents: number;
  studentDetails: any[] = []; // Replace with actual data
  chartOptions: Highcharts.Options = {
    chart: {
      width: 500,  // Width of the chart
      height: 300  // Height of the chart
    },
    title: {
      text: 'Student Admissions'
    },
    xAxis: {
      categories: ['2018', '2019', '2020']
    },
    yAxis: {
      title: {
        text: 'Number of Students'
      }
    },
    series: [{
      type: 'column',
      name: 'Students',
      data: [100, 200, 150],
      events: {
        click: (event) => {
          this.selectedYear = event.point.category as string;
          this.selectedStudents = event.point.y as number;
          // Open the modal and populate it with data
          // fetch student details for the selected year
          // this.studentDetails = this.fetchStudentDetails(this.selectedYear);
          this.modalComponent.selectedYear = this.selectedYear;
          this.modalComponent.openModal();
        }
      }
    }]
  };

  ngOnInit(): void {
  }

 
}
