import { Injectable } from '@angular/core';
import { Resident } from '../Interface/resident';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private userUrl = 'http://localhost:8081/users'

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // POST
  getLogin(login: User): Observable<string> {
    return this.http.post<string>(this.userUrl + '/log_in', login);
  }
}
