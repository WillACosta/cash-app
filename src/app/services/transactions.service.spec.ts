import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { transactionsBaseUrl } from '../core/utils/constants';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../models/transaction.model';
import { fakeTransactionsData } from '../core/spec/mocks';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionsService],
    });

    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should return a list of Transactions', () => {
    service.getTransactions().subscribe((transactions: Transaction[]) => {
      expect(transactions.length).toBe(3);

      expect(transactions).toEqual(fakeTransactionsData);
    });

    const req = httpMock.expectOne(`${transactionsBaseUrl}/transactions`);
    req.flush({});
    httpMock.verify();
  });
});
