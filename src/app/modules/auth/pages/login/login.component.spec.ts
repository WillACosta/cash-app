import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Actions, NgxsModule, ofActionSuccessful, Store } from '@ngxs/store';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from 'src/app/services/auth.service';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { Login } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/state/auth.state';

import { LoginComponent } from './login.component';
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { findComponent } from 'src/app/core/spec/spec-helper';
import { AuthServiceMock, fakeRoutes } from 'src/app/core/spec/mocks';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;
  let router: Router;
  let actions$: Observable<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        ToastrModule.forRoot({}),
        NgxsModule.forRoot([AuthState]),
        RouterTestingModule.withRoutes(fakeRoutes),
        HttpClientTestingModule,
      ],
      providers: [{ provide: AuthService, useClass: AuthServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should renders the logo-component', () => {
    expect(findComponent(fixture, 'app-logo')).toBeTruthy();
  });

  it('should behave a two input fields in FormGroup', () => {
    const form = fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = form.querySelectorAll('input');

    expect(inputElements.length).toBe(2);
  });

  it('should check initial values for Login Form Group', () => {
    const loginForm = component.loginForm;
    const initialFormValues = {
      email: '',
      password: '',
    };

    expect(loginForm.value).toEqual(initialFormValues);
  });

  it('should validate email and password after entered some values', (done) => {
    const loginFormElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[0];

    const passwordInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[1];

    loginFormElement.value = 'testuser@test.com';
    loginFormElement.dispatchEvent(new Event('input'));

    passwordInputElement.value = 'password';
    passwordInputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const emailValue = component.loginForm.get('email')?.value;
      const passwordValue = component.loginForm.get('password')?.value;

      expect(emailValue).toEqual(loginFormElement.value);
      expect(component.loginForm.get('email')?.valid).toBeTruthy();

      expect(passwordValue).toEqual(passwordInputElement.value);
      expect(component.loginForm.get('password')?.valid).toBeTruthy();

      done();
    });
  });

  it('should check Login Form is valid when all inputs is fullfilled', (done) => {
    const emailInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[0];

    const passwordInputElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('form')
        .querySelectorAll('input')[1];

    emailInputElement.value = 'testuser@test.com';
    emailInputElement.dispatchEvent(new Event('input'));

    passwordInputElement.value = 'password';
    passwordInputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loginForm.valid).toBeTruthy();
      done();
    });
  });

  it('should store dispatch LoginAction', () => {
    const spy = spyOn(store, 'dispatch');
    store.dispatch(new Login({ email: '', password: '' }));

    expect(spy).toHaveBeenCalledWith(new Login({ email: '', password: '' }));
  });

  it('should verify if user is redirected to initial route after LoginAction is successful', (done) => {
    actions$.pipe(ofActionSuccessful(Login)).subscribe(() => {
      done();
    });

    spyOn(router, 'navigate');
    store.dispatch(new Login({ email: '', password: '' }));

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
