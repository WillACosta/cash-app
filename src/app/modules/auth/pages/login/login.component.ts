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
import { Subject, Subscription, takeUntil, tap } from 'rxjs';

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

  unsubscriber$ = new Subject<void>();

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
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.actions
      .pipe(
        ofActionSuccessful(Login),
        tap(() => (this.pageState = PageState.loaded)),
        takeUntil(this.unsubscriber$)
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });

    this.actions
      .pipe(
        ofActionErrored(Login),
        tap(() => (this.pageState = PageState.loaded)),
        takeUntil(this.unsubscriber$)
      )
      .subscribe(() => {
        this.toastr.warning(
          'Não foi possível efetuar seu login, tente novamente mais tarde!',
          'Oops!'
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
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
