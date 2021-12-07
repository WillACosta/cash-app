import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { Account } from '../../../../models/account.model';
import { AuthService } from '../../../../services/auth.service';
import { Login, Logout } from '../actions/auth.actions';

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
  static isAuthenticated(state: Account): boolean {
    return !!state.token;
  }

  @Action(Login)
  login({ setState }: StateContext<Account>, { payload }: Login) {
    return this.authService.login(payload.email!, payload.password!).pipe(
      tap((result: Account) => {
        setState({
          token: result.token,
        });
      })
    );
  }

  @Action(Logout)
  logout({ setState }: StateContext<Account>) {
    setState({
      token: null,
    });
  }
}
