import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { Account } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';

import { Login } from '../actions/auth.actions';

@State<Account>({
  name: 'auth',
  defaults: {
    token: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static token(state: Account): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: Account) {
    return !!state.token;
  }

  @Action(Login)
  login({ patchState }: StateContext<Account>, { payload }: Login) {
    return this.authService.login(payload.email!, payload.password!).pipe(
      tap((result: Account) => {
        patchState({
          token: result.token,
        });
      })
    );
  }
}
