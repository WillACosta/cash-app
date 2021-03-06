export class AuthServiceMock {
  login = jest.fn();
  logout = jest.fn();
}

export class MockTransactionsService {
  getAllTransactions = jest.fn();
  getPaginatedTransactions = jest.fn();
  saveTransaction = jest.fn();
  deleteTransaction = jest.fn();
  updateTransaction = jest.fn();
}

export const provider = (mock: any): any => mock;

export const fakeHttpClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};
