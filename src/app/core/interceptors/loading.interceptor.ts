import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';

import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/service/common/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private totalRequests = 0;
    constructor(private loadingService: LoadingService) {}

    intercept(request: HttpRequest < any > , next: HttpHandler) {
        this.totalRequests++;
      //  setTimeout(() => {
            if( this.totalRequests>0)
                this.loadingService.setLoading(true);
        //}, 500);

        return next.handle(request).pipe(
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests === 0) {
                    setTimeout(() => {
                    this.loadingService.setLoading(false);
                    }, 500);

                }
            })
        );
    }
}