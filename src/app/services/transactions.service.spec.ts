import { TransactionsService } from './transactions.service';
import { transactionsBaseUrl } from '../core/utils';

import { fakeHttpClient, fakeTransactionsData } from '../core/spec';

import { of } from 'rxjs';
import { TransactionProps } from '../models/transaction.model';

const transactionsUrl = `${transactionsBaseUrl}/transactions`;

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    service = new TransactionsService(fakeHttpClient as any);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should retrieve a list of all transactions', () => {
    fakeHttpClient.get.mockImplementationOnce(() => of(fakeTransactionsData));

    service.getAllTransactions().subscribe((transactions) => {
      expect(fakeHttpClient).toBeCalledWith(transactionsUrl);
      expect(transactions).toEqual(fakeTransactionsData);
    });
  });

  test('should retrieve a list of paginated transactions', () => {
    fakeHttpClient.get.mockImplementationOnce(() => of(fakeTransactionsData));

    service
      .getPaginatedTransactions(1, 10, null, null)
      .subscribe((transactions) => {
        expect(fakeHttpClient).toBeCalledWith(transactionsUrl, {
          params: {
            _page: 1,
            _limit: 10,
          },
        });

        expect(transactions).toEqual(fakeTransactionsData);
      });
  });

  test('should save a new transaction', () => {
    const payload: TransactionProps = {
      type: 'incoming',
      date: '2020-01-01',
      description: 'test',
      amount: 100,
      isPayed: null,
    };

    fakeHttpClient.post.mockImplementationOnce(() => of({}));

    service.saveTransaction(payload).subscribe((response) => {
      expect(fakeHttpClient).toBeCalledWith(transactionsUrl, {
        body: payload,
      });

      expect(response).toEqual({});
    });
  });

  test('should add required atributtes on payload when received', () => {
    const expectedPayloadValue = {
      id: 1,
      type: 'incoming',
      date: '2020-01-01T00:00:00.000Z',
      description: 'test',
      amount: 100,
      isPayed: null,
      currency: 'BRL',
    };

    const payload: TransactionProps = {
      type: 'incoming', // incoming
      date: '2020-01-01',
      description: 'test',
      amount: 100,
      isPayed: null,
    };

    fakeHttpClient.post.mockImplementationOnce(() => of({}));

    service.saveTransaction(payload).subscribe((_) => {
      expect(fakeHttpClient).toBeCalledWith(transactionsUrl, {
        body: expectedPayloadValue,
      });
    });
  });
});
