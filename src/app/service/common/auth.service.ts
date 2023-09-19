import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { msgTypes } from 'src/app/constants/common/msgType';
import { Auth } from 'src/app/model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;

  constructor(private httpClient: HttpClient) { }

  authanticate(credentials: Auth){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post('/auth/login', JSON.stringify(credentials), {headers: headers});
  }
  
  getToken(){
    let EncryptedAccessToken = localStorage.getItem('access_token');
    if(EncryptedAccessToken){
      return this.getDecryptText(EncryptedAccessToken)
    }
    return '';
  }

  getUserType(){
    let EncryptedUsertype = localStorage.getItem('userType');
    if(EncryptedUsertype){
      return this.getDecryptText(EncryptedUsertype)
    }
    return '';
  }

  generateToken(){
    return this.httpClient.get('/generateToken');
  }

  validateToken(){
    return this.httpClient.get('/validateToken');
  }

  //Encryption
  public getEncryptText(plaintText: string) {
    let encryptedBase64Key = msgTypes.APP_SECRET_KEY;
    const parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
    // this is Base64-encoded encrypted data
    const encryptedData = CryptoJS.AES.encrypt(plaintText, parsedBase64Key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    return encryptedData; 
  }

//Decryption
public getDecryptText(encryptedData: string) {
  let encryptedBase64Key = msgTypes.APP_SECRET_KEY;
  const parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);

  const decryptedData = CryptoJS.AES.decrypt(encryptedData, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  });
  // this is the decrypted data as a string
  const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}

isLoggedIn(){
  const state = JSON.parse(''+localStorage.getItem(msgTypes.STATE));
  const loggedIn= JSON.parse(this.getDecryptText(state));

  if (loggedIn)
    this.isLogin = true;
  else
    this.isLogin = false;
  return this.isLogin;
}

getRole() {
   const role = JSON.parse(''+localStorage.getItem('userType'));
   //return this.getDecryptText(role);
   return role;
}

getUserPermission(){
  const userPermission = localStorage.getItem('userPermission');
  if(userPermission){
    //return this.getDecryptText(userPermission)
    return userPermission;
  }
  return '';
}

}
