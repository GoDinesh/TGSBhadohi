import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { msgTypes } from 'src/app/constants/common/msgType';
import { AuthService } from 'src/app/service/common/auth.service';
import { SweetAlertService } from 'src/app/service/common/sweet-alert.service';
import { Router } from '@angular/router';
import { routeType } from 'src/app/constants/common/routeType';
import { appurl } from 'src/app/constants/common/appurl';
import { ResponseModel } from 'src/app/model/shared/response-model.model';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  encryptedBody: string = '';
  baseUrl:string = appurl.baseurl;
  constructor(private authService: AuthService,
    private sweetAlertService: SweetAlertService,
    private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add baseurl in url
    const authToken = this.authService.getToken();
    let jsonEncryptData = {};
    if(request.body){
        this.encryptedBody = this.authService.getEncryptText(request.body.toString());
        jsonEncryptData = { "body": this.encryptedBody}
    }
    
    const apiReq = request.clone({ 
                            url: `${this.baseUrl + request.url}` ,
                            setHeaders: {
                              Authorization: "Bearer " + authToken,
                              "Content-type" : msgTypes.CONTENT_TYPE.APPLICATION_JSON
                            },
                            body: jsonEncryptData
                            //body: this.encryptedBody
                        });
    //to add access token
    return next.handle(apiReq)
    .pipe(
      map(resp =>{
        if(resp instanceof HttpResponse){
            const plainResponse = this.authService.getDecryptText((resp.body).toString());
            const res = JSON.parse(plainResponse);
            let responseModel: ResponseModel = new ResponseModel();
            responseModel = res;
            if(res.name == msgTypes.TOKEN_EXPIRE_ERROR){
                  this.sweetAlertService.showAlert(msgTypes.UNAUTHORIZE, msgTypes.TOKEN_EXPIRED, msgTypes.ERROR, msgTypes.OK_KEY);
                  localStorage.clear();
                  this.router.navigate([routeType.LOGIN])
            }else{
                  let status = '';
                  if(res.status == msgTypes.SUCCESS_MESSAGE){
                    status = msgTypes.SUCCESS;
                  }else{
                    status = msgTypes.ERROR;
                  }
                  if(res.alert ===true){
                    this.sweetAlertService.showAlert(status, res.message, status, msgTypes.OK_KEY);
                  }
                  
            }
            return resp.clone({ body: responseModel });
         }
         return resp;
      })
    )
  }

  
}




