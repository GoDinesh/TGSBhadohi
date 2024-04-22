import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild} from '@angular/core';
import * as moment from 'moment';
import { NgxPrintModule } from 'ngx-print';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Fees } from 'src/app/model/fees/fees.model';

@Component({
  selector: 'app-fees-receipt-printout',
  templateUrl: './fees-receipt-printout.component.html',
  styleUrls: ['./fees-receipt-printout.component.css'],
  standalone: true,
  imports: [NgxPrintModule, CommonModule]
})
export class FeesReceiptPrintoutComponent{
  @Input() feesModel:Fees;
  @ViewChild('printButton') childElement:any;
  feesModel1:Fees;
  ngDoCheck() {
    this.feesModel1 = this.feesModel;
    const dt = this.feesModel1.paymentDate.split("-");
    this.feesModel1.paymentDate = dt[2]+"-"+dt[1]+"-"+dt[0];//moment(this.feesModel.paymentDate).format(msgTypes.DD_MM_YYYY);
  }
}

