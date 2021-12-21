import { Routes } from '@angular/router';

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
    isPayedOrReceived: false,
  },
  {
    id: 2,
    date: '2021-01-01',
    amount: 200,
    description: 'Description',
    type: 'incoming',
    currency: 'BRL',
    isPayedOrReceived: false,
  },
  {
    id: 3,
    date: '2021-01-01',
    amount: 100,
    description: 'Description',
    type: 'incoming',
    currency: 'BRL',
    isPayedOrReceived: true,
  },
  {
    id: 4,
    date: '2021-01-01',
    amount: 15,
    description: 'Description',
    type: 'expense',
    currency: 'BRL',
    isPayedOrReceived: true,
  },
];

export const mockPaginatedTransactionsResponse = {
  body: fakeTransactionsData,
  headers: {
    get: (value: string) => 4,
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
    isPayedOrReceived: false,
  },
  {
    id: 3,
    date: '2021-01-01',
    amount: 100,
    description: 'Description',
    type: 'incoming',
    currency: 'BRL',
    isPayedOrReceived: true,
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
    isPayedOrReceived: false,
  },
  {
    id: 4,
    date: '2021-01-01',
    amount: 15,
    description: 'Description',
    type: 'expense',
    currency: 'BRL',
    isPayedOrReceived: true,
  },
];

export const receivedIncomingTransactions = [
  {
    id: 3,
    date: '2021-01-01',
    amount: 100,
    description: 'Description',
    type: 'incoming',
    currency: 'BRL',
    isPayedOrReceived: true,
  },
];

export const payedExpenseTransactions = [
  {
    id: 4,
    date: '2021-01-01',
    amount: 15,
    description: 'Description',
    type: 'expense',
    currency: 'BRL',
    isPayedOrReceived: true,
  },
];
