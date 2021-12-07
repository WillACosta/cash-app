export class StoreMock {
  dispatch = jest.fn();
  selectSnapshot = jest.fn();
}

export class MockStateContext {
  getState = jest.fn();
  patchState = jest.fn();
  setState = jest.fn();
  dispatch = jest.fn();
}
