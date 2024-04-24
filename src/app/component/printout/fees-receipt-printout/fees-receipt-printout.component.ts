import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild} from '@angular/core';
import * as moment from 'moment';
import { NgxPrintModule } from 'ngx-print';
import { msgTypes } from 'src/app/constants/common/msgType';
import { DateFormatPipePipe } from 'src/app/core/pipes/date-format-pipe.pipe';
import { Fees } from 'src/app/model/fees/fees.model';
import { SharedModule } from 'src/app/shared-module';

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
 
}

