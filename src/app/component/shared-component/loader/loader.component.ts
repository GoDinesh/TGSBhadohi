import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from 'src/app/service/common/loading.service';
//import { AppModule } from 'src/app/app.module';


@Component({
  selector: 'csg-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule]
})
export class LoaderComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private loadingService: LoadingService
    ) { }
    
  ngOnInit(): void {
    // this.spinner.show();
    this.loadingService.isLoadingSubject.subscribe((res)=>{
     if(res)
       this.spinner.show();
     else
       this.spinner.hide();
    })
   }

}
