import { Injectable } from '@angular/core';
import { Resident } from '../Interface/resident';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Billing } from '../Interface/billing';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private url = 'http://localhost:8080/billing';

  private httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('auth') }),
  };

  private httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('auth') }),
    observe: 'response'
  };

  getAllBillings(): Observable<HttpResponse<Billing[]>> {

    if (this.cookieService.get('etagBillingAll')) {
      let etag = this.cookieService.get('etagBillingAll');
      return this.http.get<Billing[]>(this.url + "/all", { observe: 'response', headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('auth'), 'If-None-Match': etag }) }).pipe(catchError(err => {
        console.log('err' , err)
        if (err.status === 304) {
          return of(err.body);
        }
      }));
    }

    return this.http.get<Billing[]>(this.url + "/all", { observe: 'response', headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('auth') }) });
  }

  getAllBilling(): Observable<HttpResponse<Billing[]>> {
    if (this.cookieService.get('etagBillingAll')) {
      let etag = this.cookieService.get('etagBillingAll');
      return this.http.get<Billing[]>(this.url + "/all", { observe: 'response', headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('auth'), 'If-None-Match': etag }) });
    }
    return this.http.get<Billing[]>(this.url + "/all", { observe: 'response', headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('auth') }) });
  }

  updateBilling(billing: Billing): Observable<Billing> {
    return this.http.put<Billing>(this.url + "/update", billing, this.httpOptions);
  }

  addBilling(billing: Billing): Observable<Billing> {
    return this.http.post<Billing>(this.url + "/add", billing, this.httpOptions);
  }

  deleteBilling(id: number): Observable<Billing> {
    return this.http.delete<Billing>(this.url + `/delete/${id}`, this.httpOptions);
  }

  getBillingByResident(id: number): Observable<Billing> {
    return this.http.get<Billing>(this.url + `/resident/${id}`, this.httpOptions);
  }


}
