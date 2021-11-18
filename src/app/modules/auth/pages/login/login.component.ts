import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Actions,
  ofActionErrored,
  ofActionSuccessful,
  Store,
} from '@ngxs/store';

import { ToastrService } from 'ngx-toastr';
import { Subscription, tap } from 'rxjs';

import { Login } from '../../store/actions/auth.actions';

enum PageState {
  initial,
  loading,
  loaded,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSuccessSubscription!: Subscription;
  loginErrorSubscription!: Subscription;

  email?: string;
  password?: string;

  hideText: Boolean = true;

  PageStateType = PageState;
  pageState = PageState.initial;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private store: Store,
    private actions: Actions
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loginSuccessSubscription = this.actions
      .pipe(
        ofActionSuccessful(Login),
        tap(() => (this.pageState = PageState.loaded))
      )
      .subscribe(() => {
        this.router.navigate(['/auth/register']);
      });

    this.loginErrorSubscription = this.actions
      .pipe(
        ofActionErrored(Login),
        tap(() => (this.pageState = PageState.loaded))
      )
      .subscribe(() => {
        this.toastr.warning(
          'Não foi possível efetuar seu login, tente novamente mais tarde!',
          'Oops!'
        );
      });
  }

  ngOnDestroy(): void {
    if (this.loginSuccessSubscription)
      this.loginSuccessSubscription.unsubscribe();

    if (this.loginErrorSubscription) this.loginErrorSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) return;

    this.pageState = this.PageStateType.loading;
    const { email, password } = this.loginForm.value;

    this.store.dispatch(new Login({ email, password }));
  }

  togleInputVisibility() {
    this.hideText = !this.hideText;
  }
}
