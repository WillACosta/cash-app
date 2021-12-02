import { TransactionsService } from './transactions.service';
import { transactionsBaseUrl } from '../core/utils';

import {
  fakeHttpClient,
  fakeTransactionsData,
  provider,
} from '../core/spec/mocks';

import { of } from 'rxjs';

const transactionsUrl = `${transactionsBaseUrl}/transactions`;

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    service = new TransactionsService(provider(fakeHttpClient));
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
});
