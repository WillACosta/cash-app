import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { Account } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';

import { Login } from '../actions/auth.actions';

export class AuthStateModel {
  account: Account | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    account: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return !!state.account;
  }

  @Action(Login)
  login(
    { getState, patchState }: StateContext<AuthStateModel>,
    { payload }: Login
  ) {
    return this.authService.login(payload.email!, payload.password!).pipe(
      tap((result: Account) => {
        patchState({
          account: {
            token: result.token,
          },
        });
      })
    );
  }
}
