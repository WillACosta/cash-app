import { HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import {
  MockStateContext,
  MockTransactionsService,
} from '../../../../../core/spec';

import { HandleApiError } from '../../../../../shared/store/api-error/api-error.actions';
import { TransactionProps } from '../../../../../models/transaction.model';

import { SaveTransaction } from './transactions.actions';
import { TransactionsState } from './transactions.state';

const fakeTransactionProps: TransactionProps = {
  type: 'incoming',
  amount: 100,
  date: '2021-01-01',
  description: 'test',
  isPayed: null,
};

describe('TransactionState', () => {
  let service: MockTransactionsService;
  let stateContext: MockStateContext;
  let transactionState: TransactionsState;

  beforeEach(() => {
    service = new MockTransactionsService();
    transactionState = new TransactionsState(service as any);
    stateContext = new MockStateContext();
  });

  test('should create the state', () => {
    expect(transactionState).toBeTruthy();
  });

  describe('State Actions', () => {
    test('should save an transaction', () => {
      service.saveTransaction.mockReturnValue(of({}));

      transactionState.saveTransaction(
        stateContext,
        new SaveTransaction(fakeTransactionProps)
      );

      expect(service.saveTransaction).toHaveBeenCalled();
    });

    test('should dispatch action to handle error', (done) => {
      const error = new HttpResponse({ status: 500 });
      service.saveTransaction.mockReturnValue(throwError(error));

      stateContext.dispatch.mockReturnValue(of(error));

      transactionState
        .saveTransaction(
          stateContext as any,
          new SaveTransaction(fakeTransactionProps)
        )
        .subscribe(() => {
          expect(stateContext.dispatch).toBeCalledWith(
            new HandleApiError(new SaveTransaction(fakeTransactionProps), error)
          );

          done();
        });
    });
  });
});
