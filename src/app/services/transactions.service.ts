import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { retry } from 'rxjs';

import { environment } from '../../environments/environment';
import { Transaction, TransactionProps } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private httpClient: HttpClient) {}

  getAllTransactions() {
    return this.httpClient
      .get<Transaction[]>(environment.appApis.transactions)
      .pipe(retry(2));
  }

  getPaginatedTransactions(
    page: number = 1,
    limit: number = 5,
    sortBy: string | null,
    sortOrder: string | null
  ) {
    const queryParams = this.getQueryParams(page, limit, sortBy, sortOrder);

    return this.httpClient.get<Transaction[]>(
      `${environment.appApis.transactions}${queryParams}`,
      {
        observe: 'response',
      }
    );
  }

  saveTransaction(payload: TransactionProps) {
    return this.httpClient
      .post<void>(environment.appApis.transactions, payload)
      .pipe(retry(2));
  }

  deleteTransaction(id: string) {
    return this.httpClient
      .delete<void>(`${environment.appApis.transactions}/${id}`)
      .pipe(retry(2));
  }

  updateTransaction(id: string, payload: TransactionProps) {
    return this.httpClient
      .put<void>(`${environment.appApis.transactions}/${id}`, payload)
      .pipe(retry(2));
  }

  private getQueryParams(
    page: number,
    limit: number,
    sortBy: string | null,
    sortOrder: string | null
  ) {
    let queryParams = `?_page=${page}&_limit=${limit}`;

    if (sortBy) {
      queryParams += `&_sort=${sortBy}`;
    }

    if (sortOrder) {
      queryParams += `&_order=${sortOrder}`;
    }

    return queryParams;
  }
}
