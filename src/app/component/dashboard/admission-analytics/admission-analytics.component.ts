import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StudentDetailsModalComponent } from '../student-details-modal/student-details-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationService } from 'src/app/service/student/registration.service';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Registration } from 'src/app/model/student/registration.model';
import { ClassService } from 'src/app/service/masters/class.service';
import { Observable, forkJoin, map } from 'rxjs';
import { Class } from 'src/app/model/master/class.model';
import { AcademicYearService } from 'src/app/service/masters/academic-year.service';
import { AcademicYear } from 'src/app/model/master/academic-year.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admission-analytics',
  templateUrl: './admission-analytics.component.html',
  styleUrls: ['./admission-analytics.component.css']
})
export class AdmissionAnalyticsComponent {

  posts: Registration[] = [];
  allClassList: Observable<Class[]> = new Observable();
  academicYearList: Observable<AcademicYear[]> = new Observable();

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private classService: ClassService,
    private academicYearService: AcademicYearService) { }

  // type = 'column2d';
  // width = '600';
  // height = '400';
  // data = {
  //   chart: {
  //     caption: "Student Admissions by Session",
  //     subCaption: "For the academic year 2022-2023",
  //     xAxisName: "Session",
  //     yAxisName: "Number of Admissions",
  //     numberSuffix: "",
  //     theme: "fusion"
  //   },
  //   data: [
  //     { label: "Session 1", value: "50" },
  //     { label: "Session 2", value: "30" },
  //     { label: "Session 3", value: "20" }
  //   ]
  // };

  formgroup = new FormGroup({
    academicYearCode: new FormControl(),
  });
 
  createForm(academicyear: AcademicYear) {
    this.formgroup = this.formBuilder.group({
      academicYearCode: [academicyear.academicYearCode]
    });
  }
  Highcharts: typeof Highcharts = Highcharts;
  selectedClass: string;
  selectedClassCode: string;
  selectedStudents: number;
  studentDetails: any;
  chartOptions: Highcharts.Options;

  currentAcademicYear = this.getCurrentAcademicYear();

  ngOnInit(): void {
    this.createForm(new AcademicYear);
    this.getStudentRecord();
    this.customInit();
    //this.loadClass(this.currentAcademicYear);

  }

  async customInit(){
    await this.loadAcademicyear();
    this.formgroup.controls.academicYearCode.setValue(this.currentAcademicYear)
    this.updateChartData();
  }

  updateChartData(): void {
    //const selectedYear = (event.target as HTMLSelectElement).value;
    this.loadClass(this.formgroup.controls.academicYearCode.value);
  }

  loadClass(academicYear: string) {

    forkJoin([
      this.classService.getAllActiveClass(),
      this.registrationService.studentList(new Registration())
    ]).subscribe(([classRes, studentRes]) => {
      // Assuming classRes and studentRes have a 'data' property
      const classes = classRes.data;
      this.posts = studentRes.data;

      const categories = classes.map((c: { className: string; }) => c.className);
      const classCode = classes.map((c: { classCode: string; }) => c.classCode);
      
      // Count the number of students for each class
      const studentCounts = classCode.map((standard: string) => {
        return this.posts.filter(post => post.standard === standard && post.academicYearCode === academicYear).length;
      });

      const boysCounts = classCode.map((standard: string) => {
        return this.posts.filter(post => post.standard === standard && post.academicYearCode === academicYear && post.gender==='M').length;
      });

      const girlsCounts = classCode.map((standard: string) => {
        return this.posts.filter(post => post.standard === standard && post.academicYearCode === academicYear && post.gender==='F').length;
      });

      this.chartOptions = {
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

              const selectedClassObj = classes.find((c: { className: string; }) => c.className === this.selectedClass);

              if (selectedClassObj) {
                this.selectedClassCode = selectedClassObj.classCode;
              }
              this.studentDetails = this.posts.filter(student => student.standard === this.selectedClassCode && student.academicYearCode === academicYear);
              const dialogRef = this.dialog.open(StudentDetailsModalComponent, {
                data: {
                  students: this.studentDetails,
                  class: this.selectedClass
                }
              });

              dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog closed: ${result}`);
              });
            }
          }
        },
        {
          type: 'column',
          name: 'Boys',
          data: boysCounts,
          events: {
            click: (event:any) => {
              this.selectedClass = event.point.category as string;
              this.selectedStudents = event.point.y as number;

              const selectedClassObj = classes.find((c: { className: string; }) => c.className === this.selectedClass);

              if (selectedClassObj) {
                this.selectedClassCode = selectedClassObj.classCode;
              }
              this.studentDetails = this.posts.filter(student => student.standard === this.selectedClassCode && student.academicYearCode === academicYear && student.gender==='M');
              const dialogRef = this.dialog.open(StudentDetailsModalComponent, {
                data: {
                  students: this.studentDetails,
                  class: this.selectedClass
                }
              });

              dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog closed: ${result}`);
              });
            }
          }
        },
        {
          type: 'column',
          name: 'Girls',
          data: girlsCounts,
          events: {
            click: (event:any) => {
              this.selectedClass = event.point.category as string;
              this.selectedStudents = event.point.y as number;

              const selectedClassObj = classes.find((c: { className: string; }) => c.className === this.selectedClass);

              if (selectedClassObj) {
                this.selectedClassCode = selectedClassObj.classCode;
              }
              this.studentDetails = this.posts.filter(student => student.standard === this.selectedClassCode && student.academicYearCode === academicYear && student.gender==='F');
              const dialogRef = this.dialog.open(StudentDetailsModalComponent, {
                data: {
                  students: this.studentDetails,
                  class: this.selectedClass
                }
              });

              dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog closed: ${result}`);
              });
            }
          }
          
        }
      ]
      };

    });
  }

  getCurrentAcademicYear(): string {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return `${currentYear}${nextYear}`;
  }
  

  async loadAcademicyear() {
    this.academicYearList = this.academicYearService.getAllActiveAcademicYear().pipe(
      map((res) => {
        return res.data;
      })
      
    )
  };

  async getStudentRecord() {
    const standard: Registration = new Registration();
    this.registrationService.studentList(standard).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.posts = res.data;
      }
    })
  }
}
