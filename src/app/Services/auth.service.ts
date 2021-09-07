import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private cookieService: CookieService) { }

  public isAuthenticated(): boolean {
    const token = this.cookieService.get('auth');
    console.log(token);
    return !this.jwtHelper.isTokenExpired(token);
  }



}
