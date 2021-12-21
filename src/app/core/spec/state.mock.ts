import { fakeTransactionsData } from './values.mock';

export const mainStateData = {
  allTransactions: fakeTransactionsData,
};

export const defaultMainStateValue = {
  allTransactions: [],
  paginatedTransactions: {
    transactions: [],
    resultsLength: 0,
  },
};

export const mockMainStateValue = {
  allTransactions: fakeTransactionsData,
  paginatedTransactions: {
    transactions: fakeTransactionsData,
    resultsLength: 4,
  },
};
