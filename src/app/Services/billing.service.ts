import { Injectable } from '@angular/core';
import { Resident } from '../Interface/resident';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Billing } from '../Interface/billing';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private url = 'http://localhost:8081/billing';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('auth') })
  };


  getAllBilling(): Observable<Billing[]> {
    return this.http.get<Billing[]>(this.url + "/all", this.httpOptions);
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
