import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

import { transactionsBaseUrl } from '../core/utils/constants';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private httpClient: HttpClient) {}

  getTransactions() {
    return this.httpClient
      .get<Transaction[]>(`${transactionsBaseUrl}/transactions`)
      .pipe(retry(2));
  }
}
