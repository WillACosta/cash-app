import { fakeTransactionsData } from './values.mock';

export const mainStateData = {
  allTransactions: [
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
  ],
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
    resultsLength: 2,
  },
};
