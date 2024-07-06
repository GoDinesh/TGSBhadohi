import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild} from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
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

  constructor(){
  }

  ngOnInit(){
  }
 
}

