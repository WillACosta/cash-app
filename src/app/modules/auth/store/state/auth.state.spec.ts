import { AuthState } from './auth.state';
import { of } from 'rxjs';

import { Login } from '../actions/auth.actions';
import { AuthServiceMock, MockStateContext } from '../../../../core/spec';

describe('AuthState', () => {
  let authService: AuthServiceMock;
  let authState: AuthState;
  let stateContext: MockStateContext;

  beforeEach(() => {
    stateContext = new MockStateContext();
    authService = new AuthServiceMock();
    authState = new AuthState(authService as any);
  });

  describe('Store Actions', () => {
    test('should set token if it does not exist', (done) => {
      stateContext.getState.mockReturnValue({ token: null });
      authService.login.mockReturnValue(of({ token: 'fake-token' }));

      authState
        .login(stateContext as any, new Login({ email: '', password: '' }))
        .subscribe(() => {
          expect(stateContext.setState).toHaveBeenCalledWith({
            token: 'fake-token',
          });

          done();
        });
    });

    test('should not call service if token already exists in the state', () => {
      const token = 'fake-token';
      stateContext.getState.mockReturnValue(token);
      authService.login.mockReturnValue(of(token));

      expect(authService.login).not.toHaveBeenCalled();
    });
  });

  describe('Store Selectors', () => {
    const mockStateWithoutToken = {
      token: null,
    };

    const mockStateWithToken = {
      token: 'fake-token',
    };

    test('should get an empty value of `token`', () => {
      const actualValue = AuthState.token(mockStateWithoutToken);
      expect(actualValue).toEqual(null);
    });

    test('should get an false value when `token` is invalid', () => {
      const actualValue = AuthState.isAuthenticated(mockStateWithoutToken);
      expect(actualValue).toEqual(false);
    });

    test('should get an valid token value', () => {
      const actualValue = AuthState.token(mockStateWithToken);
      expect(actualValue).toEqual('fake-token');
    });

    test('should get an true value when `token` is valid', () => {
      const actualValue = AuthState.isAuthenticated(mockStateWithToken);
      expect(actualValue).toEqual(true);
    });
  });
});
