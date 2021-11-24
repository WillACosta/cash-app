import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from '../actions/auth.actions';

import { AuthState } from './auth.state';

class AuthServiceMock {
  login(): Observable<any> {
    return of({
      token: 'fake-token',
    });
  }
}

export const SOME_DESIRED_STATE = {
  auth: {
    token: 'fake-token',
  },
};

describe('AuthState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState]), HttpClientTestingModule],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    });

    store = TestBed.inject(Store);
  });

  it('should create an instance of store', () => {
    expect(store).toBeTruthy();
  });

  it('should return the default state', () => {
    const state = store.selectSnapshot(AuthState);
    expect(state).toEqual({
      token: null,
    });
  });

  it('should select token', () => {
    const token = store.selectSnapshot(AuthState.token);
    expect(token).toBeNull();
  });

  it('should select isAuthenticated', () => {
    const isAuthenticated = store.selectSnapshot(AuthState.isAuthenticated);
    expect(isAuthenticated).toBeFalsy();
  });

  it('should select requested token from state', () => {
    store.reset({
      ...store.snapshot(),
      auth: {
        token: 'fake-token',
      },
    });

    store
      .selectOnce((state) => state.auth.token)
      .subscribe((state) => {
        expect(state).toEqual('fake-token');
      });

    const token = store.selectSnapshot((state) => state.auth.token);
    expect(token).toBeTruthy();
  });

  it('should dispatch login action', () => {
    store.dispatch(new Login({ email: '', password: '' }));

    const state = store.selectSnapshot((state) => state.auth.token);
    expect(state).toBeTruthy();
  });
});
