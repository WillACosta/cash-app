import { of } from 'rxjs';

import { MainState } from './main.state';
import * as mocks from '../../../../core/spec';

describe('MainState', () => {
  let transactionsService: mocks.MockTransactionsService;
  let mainState: MainState;
  let stateContext: mocks.MockStateContext;

  beforeEach(() => {
    transactionsService = new mocks.MockTransactionsService();
    mainState = new MainState(transactionsService as any);
    stateContext = new mocks.MockStateContext();
  });

  describe('Store Actions', () => {
    test('should set a list of `all transactions`', (done) => {
      stateContext.getState.mockReturnValue(mocks.defaultMainStateValue);

      transactionsService.getAllTransactions.mockReturnValue(
        of(mocks.fakeTransactionsData)
      );

      mainState
        .getAllTransactions(stateContext as any)
        ?.subscribe(() => done());

      expect(stateContext.patchState).toBeCalledWith(mocks.mainStateData);
    });

    test('should not call service if `allTransactions` already exists in the state', () => {
      stateContext.getState.mockReturnValue(mocks.mainStateData);
      transactionsService.getAllTransactions.mockReturnValue(
        of(mocks.mainStateData)
      );

      mainState.getAllTransactions(stateContext as any)?.subscribe();
      expect(transactionsService.getAllTransactions).not.toBeCalled();
    });

    test('should set a list of `paginated transactions`', (done) => {
      transactionsService.getPaginatedTransactions.mockReturnValue(
        of(mocks.mockPaginatedTransactionsResponse)
      );

      stateContext.getState.mockReturnValue(mocks.defaultMainStateValue);

      mainState
        .getPaginatedTransactions(stateContext as any, {
          payload: { page: 1, limit: 2, sortBy: null, sortOrder: null },
        })
        ?.subscribe(() => {
          expect(stateContext.patchState).toHaveBeenCalledWith({
            paginatedTransactions: {
              transactions: mocks.fakeTransactionsData,
              resultsLength: 4,
            },
          });
          done();
        });
    });
  });

  describe('Store Selectors', () => {
    test('should select all transactions in the state', () => {
      const actualValue = MainState.allTransactions(
        mocks.mockMainStateValue as any
      );

      expect(actualValue).toEqual(mocks.fakeTransactionsData);
    });

    test('should select paginated transactions in the state', () => {
      const actualValue = MainState.paginatedTransactions(
        mocks.mockMainStateValue as any
      );

      expect(actualValue).toEqual(
        mocks.mockMainStateValue.paginatedTransactions
      );
    });

    test('should select `incoming` transactions in the state', () => {
      const actualValue = MainState.incomingTransactions(
        mocks.mockMainStateValue as any
      );

      expect(actualValue).toEqual(mocks.mockIncomingTransactions);
    });

    test('should select `expense` transactions in the state', () => {
      const actualValue = MainState.expenseTransactions(
        mocks.mockMainStateValue as any
      );

      expect(actualValue).toEqual(mocks.mockExpenseTransactions);
    });

    test('should select receivedIncomingTransactions in the state', () => {
      const actualValue = MainState.receivedIncomingTransactions(
        mocks.mockMainStateValue as any
      );

      expect(actualValue).toEqual(mocks.receivedIncomingTransactions);
    });

    test('should select payedExpenseTransactions in the state', () => {
      const actualValue = MainState.payedExpenseTransactions(
        mocks.mainStateData as any
      );

      expect(actualValue).toEqual(mocks.payedExpenseTransactions);
    });
  });
});
