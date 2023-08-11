import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/common/local-storage.service';

@Component({
  selector: 'app-unauthorized-attempt',
  templateUrl: './unauthorized-attempt.component.html',
  styleUrls: ['./unauthorized-attempt.component.css']
})
export class UnauthorizedAttemptComponent {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
) {}

ngOnInit(): void {
    this.unAuth();
}

//On UnAuthorized Page Clear Data
unAuth() {
    this.localStorageService.clearWithoutRouting();
}

//On Click of Login Button
unAuthLogin() {
    this.router.navigate(['login']);
}

}
