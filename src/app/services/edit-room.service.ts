import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class EditRoomService {

  private url: string = 'http://localhost:8080/SampleWebApp/updateRoom';
  private url2: string = 'http://localhost:8080/SampleWebApp/deleteRoom';

  constructor(private http: HttpClient) { }

  editRoom(room): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.url, room, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteRoom(room): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.url2, room, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}