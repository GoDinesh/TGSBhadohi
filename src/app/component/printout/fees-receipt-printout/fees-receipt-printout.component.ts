import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, Input, SimpleChanges} from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { Observable } from 'rxjs';
import { Fees } from 'src/app/model/fees/fees.model';
import { ResponseModel } from 'src/app/model/shared/response-model.model';
import { FeesService } from 'src/app/service/fees/fees.service';

@Component({
  selector: 'app-fees-receipt-printout',
  templateUrl: './fees-receipt-printout.component.html',
  styleUrls: ['./fees-receipt-printout.component.css'],
  standalone: true,
  imports: [NgxPrintModule, CommonModule]
})
export class FeesReceiptPrintoutComponent{

  // feesDetails: Observable<ResponseModel> = new Observable();

  @Input() feesModel:Fees;
  constructor(private feesService: FeesService){
    // this.feesDetails = this.feesService.getFeesDetailsByReceiptNo(this.receiptNumber)
  
    // console.log(this.receiptNumber);
  
  }

 onInit(){
  
 }
 

}
