import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StudentDetailsModalComponent } from '../student-details-modal/student-details-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { RegistrationService } from 'src/app/service/student/registration.service';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Registration } from 'src/app/model/student/registration.model';
import { ClassService } from 'src/app/service/masters/class.service';
import { Observable, map } from 'rxjs';
import { Class } from 'src/app/model/master/class.model';


@Component({
  selector: 'app-admission-analytics',
  templateUrl: './admission-analytics.component.html',
  styleUrls: ['./admission-analytics.component.css']
})
export class AdmissionAnalyticsComponent {

  posts: Registration[] = [];
  allClassList: Observable<Class[]> = new Observable();
  
  constructor(private dialog: MatDialog,
  private registrationService: RegistrationService,
  private classService: ClassService,) {}

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
  selectedClass: string;
  selectedStudents: number;
  studentDetails: any;
  chartOptions: Highcharts.Options;

  ngOnInit(): void {
    this.getStudentRecord();
    this.loadClass();
  }

  loadClass() {
    this.allClassList = this.classService.getAllClass().pipe(
      map((res) => {
        return res.data;
      })
    )

    this.allClassList.subscribe(classes => {
      const categories = classes.map(c => c.className);
      const classCode = classes.map(c => c.classCode);
      
       // Count the number of students for each class
      const studentCounts = classCode.map(standard => {
        return this.posts.filter(post => post.standard === standard).length;
      });

      this.studentDetails = this.posts.map(student => ({
        studentName: student.studentName,
        standard: student.standard,
        profileImage: student.profileImage.link
      }))

      this.chartOptions =  {
        chart: {
          width: 500,  // Width of the chart
          height: 300  // Height of the chart
        },
        title: {
          text: 'Student Admissions Statistics',
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          title: {
            text: 'Number of Students'
          }
        },
        series: [{
          type: 'column',
          name: 'Students',
          data: studentCounts,
          events: {
            click: (event:any) => {
              this.selectedClass = event.point.category as string;
              this.selectedStudents = event.point.y as number;
              // Open the modal and populate it with data
              // Open Angular Material Dialog
            const dialogRef = this.dialog.open(StudentDetailsModalComponent, {
              data: {
                students: this.studentDetails
              }
            });
    
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog closed: ${result}`);
            });
            }
          }
        }]
      };
    
    });
  }

 async getStudentRecord(){
  const standard: Registration = new Registration();
  this.registrationService.studentList(standard).subscribe(res=>{
    if(res.status === msgTypes.SUCCESS_MESSAGE){
      this.posts = res.data;
    }
  })
 }
}
