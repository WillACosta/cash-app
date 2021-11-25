import { Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Transaction } from 'src/app/models/transaction.model';

import { LoginComponent } from 'src/app/modules/auth/pages/login/login.component';

export class AuthServiceMock {
  login(): Observable<any> {
    return of({
      token: 'fake-token',
    });
  }
}

export class TransactionsServiceMock {
  getTransactions(): Observable<Transaction[]> {
    return of([
      {
        id: 1,
        date: '2021-01-01',
        amount: 100,
        description: 'Description',
        type: 'expanse',
        currency: 'BRL',
        isPayed: false,
      },
    ]);
  }
}

export const fakeRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
];
