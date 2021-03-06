import { Injectable } from '@angular/core';
import { Resident } from '../Interface/resident';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})

export class ResidentService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private residentUrl = 'http://ec2-18-217-161-88.us-east-2.compute.amazonaws.com:8080/autobill-app-backend-0.0.1-SNAPSHOT/residents/'

  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('auth') })
  };

  getAllResidents(): Observable<Resident[]> {
    const residents = this.http.get<Resident[]>(this.residentUrl + "all", this.httpOptions).pipe(
      catchError(this.handleError<Resident[]>('getResidents', []))
    );

    return residents;
  }

  getAllRedientsEtag(): Observable<HttpResponse<Resident[]>> {
    let residentEtag = this.cookieService.get('residentEtag')
    if (residentEtag) {

      return this.http.get<Resident[]>(this.residentUrl + "all", {
        observe: 'response', headers: new HttpHeaders({
          'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('auth'), 'If-None-Match': residentEtag
        })
      }).pipe(catchError(err => {

        if (err.status === 304) {
          return of(err.body);
        }
      }));
    }

    return this.http.get<Resident[]>(this.residentUrl + "all", {
      observe: 'response', headers: new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('auth')
      })
    }).pipe(catchError(err => {

      if (err.status === 304) {
        return of(err.body);
      }
    }));
  }

  getResident(id: number): Observable<Resident> {
    const url = `${this.residentUrl}${id}`;
    return this.http.get<Resident>(url, this.httpOptions).pipe(
      catchError(this.handleError<Resident>(`getResident id=${id}`))
    )
  }

  updateResident(resident: Resident): Observable<Resident> {
    const url = `${this.residentUrl}update`;

    return this.http.put<Resident>(url, resident, this.httpOptions).pipe(
      catchError(this.handleError<Resident>('updateResident'))
    )
  }



  addResident(resident: Resident): Observable<Resident> {
    let url = 'http://ec2-18-217-161-88.us-east-2.compute.amazonaws.com:8080/autobill-app-backend-0.0.1-SNAPSHOT/residents/add';
    console.log(url);
    return this.http.post<Resident>('http://ec2-18-217-161-88.us-east-2.compute.amazonaws.com:8080/autobill-app-backend-0.0.1-SNAPSHOT/residents/add', resident, this.httpOptions).pipe(
      catchError(this.handleError<Resident>('addResident'))
    )
  }

  deleteResident(id: number): Observable<Resident> {
    ;
    return this.http.delete<Resident>(this.residentUrl + 'delete' + `/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<Resident>('deleteResident'))
    )
  }




  runFormInputPost(startDate: string, endDate: string, residentId: number): Observable<any> {
    let url = `http://localhost:3001/openBrowser?startDate=${startDate}&endDate=${endDate}&residentId=${residentId}`
    return this.http.get(url).pipe(
      catchError(this.handleError('get'))
    )
  }


  stsAddResident(resident: Resident): Observable<Resident> {
    return this.http.post<Resident>('http://ec2-18-217-161-88.us-east-2.compute.amazonaws.com:8080/autobill-app-backend-0.0.1-SNAPSHOT/residents/add', resident, this.httpOptions).pipe(
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
      console.log(result)

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
