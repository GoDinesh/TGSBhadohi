import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import { Fees } from 'src/app/model/fees/fees.model';
import * as moment from 'moment';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Registration } from 'src/app/model/student/registration.model';

@Component({
  selector: 'app-fees-receipt',
  templateUrl: './fees-receipt.component.html',
  styleUrls: ['./fees-receipt.component.css'],
})
export class FeesReceiptComponent {
  totalPaidAmount:number = 0;
  dtOptions: any = {};
  feesdetails: Fees[]=[];
  studentDetails: Registration = new Registration();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    this.feesdetails = data[0];
    this.studentDetails = data[1];

    this.feesdetails.map(element=>{
      this.totalPaidAmount += element.amount; 
    })
    // const fees: Fees = new Fees()
    // fees.paymentReceivedBy = "Total Paid Fees ="
    // fees.amount = this.totalPaidAmount;
    // this.feesdetails.push(fees);

  }

  //load ngOnInit
  ngOnInit() {
    this.loadTable();
  }

  //load the table
  loadTable() {
    this.dtOptions = {
      processing: true,
      // scrollY: "300px",
      bPaginate: false,
      scrollCollapse: true,
      dom: '<"align-table-buttons"B>rt<"bottom align-table-buttons"l><"clear">',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ],
    };
  }
}
