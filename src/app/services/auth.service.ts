import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://reqres.in/api';
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  login(email: string, password: string): Observable<Account> {
    const payload = JSON.stringify({ email, password });

    return this.httpClient
      .post<Account>(`${this.baseUrl}/login`, payload, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
