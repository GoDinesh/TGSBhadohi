import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    
  constructor( 
      private router: Router
  ) { }

  clear(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  clearWithoutRouting(){
    localStorage.clear();
  }
}
