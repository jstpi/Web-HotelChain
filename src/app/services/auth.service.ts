import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as moment from "moment";
import * as JWT from 'jwt-decode';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  private url: string = 'http://localhost:8080/SampleWebApp/login';
  private token: any;

  constructor(private http: HttpClient) { }

  login(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.url, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  signin(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.url, user, httpOptions)
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

  setSession(authResult) {
    this.token = JWT(authResult);

    const expiresAt = this.token.exp;

    localStorage.setItem('id_token', JSON.stringify(this.token));
    localStorage.setItem("expires_at", JSON.stringify(expiresAt));
  }
  
  setError(authResult):String {
    this.token = JWT(authResult);
    return this.token.sub;
  }

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment.unix(expiresAt);
  }

  getTokenId(){
    const token = localStorage.getItem("id_token");
    return JSON.parse(token).sub;
  }

  getTokenRole(): string{
    const token = localStorage.getItem("id_token");
    return JSON.parse(token).iss;
  }

}