import { Routes } from '@angular/router';
import { map, Observable, of } from 'rxjs';

import { Transaction } from '../../models/transaction.model';
import { LoginComponent } from '../../modules/auth/pages/login/login.component';

export const fakeRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
];

export const fakeTransactionsData = [
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
];

export const mockPaginatedTransactionsResponse = {
  body: fakeTransactionsData,
  headers: {
    get: (value: string) => 2,
  },
};

export const mockIncomingTransactions = [
  {
    id: 2,
    date: '2021-01-01',
    amount: 200,
    description: 'Description',
    type: 'incoming',
    currency: 'BRL',
    isPayed: null,
  },
];

export const mockExpenseTransactions = [
  {
    id: 1,
    date: '2021-01-01',
    amount: 100,
    description: 'Description',
    type: 'expense',
    currency: 'BRL',
    isPayed: false,
  },
];
