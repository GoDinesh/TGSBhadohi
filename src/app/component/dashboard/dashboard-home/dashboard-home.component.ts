import { Component } from '@angular/core';
import * as moment from 'moment';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Fees } from 'src/app/model/fees/fees.model';
import { Registration } from 'src/app/model/student/registration.model';
import { AuthService } from 'src/app/service/common/auth.service';
import { FeesService } from 'src/app/service/fees/fees.service';
import { RegistrationService } from 'src/app/service/student/registration.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent {

  studentList: Registration[] = [];
  feesList: Fees[] = [];

  totalStudents: number = 0;
  totalBoys: number = 0;
  totalGirls: number = 0;
  totalAadharSubmitted: number = 0;
  totalAadharNotSubmitted: number = 0;

  cashCollection: number = 0;
  onlineCollection: number = 0;
  chequeCollection: number = 0;
  ssmCollection: number = 0;

  totalBoysGirlsTab: boolean = true;
  todayFeesCollectionTab: boolean = true;
  aadharNotSubmittedTab: boolean = true;
  admissionsStatisticsGraph: boolean = true;
  pendingFeesGrabh: boolean = true;
  todayFeesCollectionGraph: boolean = true;
  todayBirthday: boolean = true;



  constructor(private registrationService: RegistrationService,
    private feesService: FeesService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.loadStudentData();
    this.loadFeesData();
    this.displayDasboardContent();
  }

  displayDasboardContent() {
    const userType = this.authService.getUserType();
    if(userType!= 'ADMIN'){
        const parsedPermissions = JSON.parse(this.authService.getUserPermission());
        parsedPermissions[0].children.map((data: any) => {
          if(data.text==msgTypes.DASHBOARD_CONTENT.TOTAL_BOYS_GIRLS_TAB){
          this.totalBoysGirlsTab= data.active;
          }else if(data.text==msgTypes.DASHBOARD_CONTENT.TODAY_FEES_COLLECTION_TAB){
          this.todayFeesCollectionTab= data.active;
          }else if(data.text==msgTypes.DASHBOARD_CONTENT.AADHAR_NOT_SUBMITTED_TAB){
          this.aadharNotSubmittedTab= data.active;
          }else if(data.text==msgTypes.DASHBOARD_CONTENT.ADMISSION_STATISTICS_GRAPH){
          this.admissionsStatisticsGraph= data.active;
          }else if(data.text==msgTypes.DASHBOARD_CONTENT.PENDING_FEES_GRAPH){
          this.pendingFeesGrabh= data.active;
          }else if(data.text==msgTypes.DASHBOARD_CONTENT.TODAY_FEES_COLLECTION_GRAPH){
          this.todayFeesCollectionGraph= data.active;
          }else if(data.text==msgTypes.DASHBOARD_CONTENT.TODAY_BIRTHDAY){
          this.todayBirthday= data.active;
          }else{}

        })
      }

  }

  loadStudentData() {
    const studentInfo: Registration = new Registration();
    //pass for printout as a argument
    this.registrationService.studentList(studentInfo).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.studentList = res.data;
        this.studentList.map(data => {
          if (data.isActive == true) {
            this.totalStudents = this.totalStudents + 1;
            if (data.gender == 'M') {
              this.totalBoys = this.totalBoys + 1;
            } else {
              this.totalGirls = this.totalGirls + 1;
            }

            if (data.aadhaarNumber == '') {
              this.totalAadharNotSubmitted = this.totalAadharNotSubmitted + 1;
            } else {
              this.totalAadharSubmitted = this.totalAadharSubmitted + 1;
            }
          }
        })

      }
    })
  }

  loadFeesData() {
    const fees: Fees = new Fees();
    fees.startDate = moment(new Date()).format(msgTypes.YYYY_MM_DD);
    fees.endDate = moment(new Date()).format(msgTypes.YYYY_MM_DD);

    this.feesService.getPaidFeesOfStudent(fees).subscribe(res => {
      if (res.status === msgTypes.SUCCESS_MESSAGE) {
        this.feesList = res.data;
        this.feesList.map(data => {
          if (data.paymenttype == msgTypes.PAYMENT_TYPE.FEES) {
            if (data.paymentMode == msgTypes.PAYMENT_METHOD.CASH)
              this.cashCollection += data.amount;
            else if (data.paymentMode == msgTypes.PAYMENT_METHOD.ONLINE)
              this.onlineCollection += data.amount;
            else if (data.paymentMode == msgTypes.PAYMENT_METHOD.CHEQUE)
              this.chequeCollection += data.amount;
          } else if (data.paymenttype == msgTypes.PAYMENT_TYPE.SSM_FEES) {
            this.ssmCollection += data.amount;
          }
        })
      }
    })
  }

}
