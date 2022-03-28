import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../Interface/account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:5000/account';

  private httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('auth') }),
  };

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.url + '/all', this.httpOptions);
  }
}
