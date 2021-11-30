import { Routes } from '@angular/router';
import { map, Observable, of } from 'rxjs';

import { Transaction } from '../../models/transaction.model';
import { LoginComponent } from '../../modules/auth/pages/login/login.component';

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
        type: 'expense',
        currency: 'BRL',
        isPayed: false,
      },
      {
        id: 2,
        date: '2021-01-01',
        amount: 200,
        description: 'Description',
        type: 'incoming',
        currency: 'BRL',
        isPayed: null,
      },
    ]).pipe(
      map((transactions) => {
        return transactions.map((t) => {
          return new Transaction().deserialize(t);
        });
      })
    );
  }
}

export const fakeRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
];

export const fakeMainStateData = {
  transactions: [
    new Transaction().deserialize({
      id: 1,
      date: '2021-01-01',
      amount: 100,
      description: 'Description',
      type: 'expense',
      currency: 'BRL',
      isPayed: false,
    }),
    new Transaction().deserialize({
      id: 2,
      date: '2021-01-01',
      amount: 200,
      description: 'Description',
      type: 'incoming',
      currency: 'BRL',
      isPayed: null,
    }),
  ],
};

export const fakeTransactionsData = [
  new Transaction().deserialize({
    id: 1,
    date: '2021-01-01',
    amount: 100,
    description: 'Description',
    type: 'expense',
    currency: 'BRL',
    isPayed: false,
  }),
  new Transaction().deserialize({
    id: 2,
    date: '2021-01-01',
    amount: 200,
    description: 'Description',
    type: 'incoming',
    currency: 'BRL',
    isPayed: null,
  }),
];

export const fakeIncomingData = [
  new Transaction().deserialize({
    id: 2,
    date: '2021-01-01',
    amount: 200,
    description: 'Description',
    type: 'incoming',
    currency: 'BRL',
    isPayed: null,
  }),
];
