import { Injectable } from '@angular/core';
import { Resident } from '../Interface/resident';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class ResidentService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private residentUrl = 'http://localhost:8081/residents/'


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('auth') })
  };

  getAllResidents(): Observable<Resident[]> {
    const residents = this.http.get<Resident[]>(this.residentUrl + "all", this.httpOptions).pipe(
      catchError(this.handleError<Resident[]>('getResidents', []))
    );
    
    return residents;
  }

  getResident(id: number): Observable<Resident> {
    const url = `${this.residentUrl}${id}`;
    return this.http.get<Resident>(url, this.httpOptions).pipe(
      catchError(this.handleError<Resident>(`getResident id=${id}`))
    )
  }

  updateResident(resident: Resident): Observable<any> {
    const url = `${this.residentUrl}/${resident.id}`;

    return this.http.put(url, resident, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateResident'))
    )
  }

  

  addResident(resident: Resident): Observable<Resident> {
    return this.http.post<Resident>(this.residentUrl, resident, this.httpOptions).pipe(
      catchError(this.handleError<Resident>('addResident'))
    )
  }

  deleteResident(id: number): Observable<Resident> {
    const url = `${this.residentUrl}/${id}`;
    return this.http.delete<Resident>(url, this.httpOptions).pipe(
      catchError(this.handleError<Resident>('deleteResident'))
    )
  }


  runFormInput(): Observable<any> {
    let url = 'http://localhost:3001'
    return this.http.get(url).pipe(
      catchError(this.handleError('get'))
    )
  }


  callOpenBrowser(): Observable<any> {
    let url = `http://localhost:3001/openBrowser`

    return this.http.get(url, this.httpOptions).pipe(
      catchError(this.handleError('get browser')
      ))

  }
  runFormInputPost(startDate: string, endDate: string, residentId: number): Observable<any> {
    let dateObj = {
      startDate: startDate,
      endDate: endDate
    }
    let url = `http://localhost:3001/openBrowser?startDate=${startDate}&endDate=${endDate}&residentId=${residentId}`
    return this.http.get(url, this.httpOptions).pipe(
      catchError(this.handleError('get'))
    )
  }


  stsAddResident(resident: Resident): Observable<Resident> {
    return this.http.post<Resident>('http://localhost:8081/residents/add', resident, this.httpOptions).pipe(
      catchError(this.handleError<Resident>('addResident'))
    )
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
