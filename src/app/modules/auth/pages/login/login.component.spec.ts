import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, Routes } from '@angular/router';

import { Observable, of } from 'rxjs';
import { NgxsModule, Store } from '@ngxs/store';

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

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClient, HttpHeaders } from '@angular/common/http';

class MockAuthService {
  login(): Observable<any> {
    return of({});
  }
}

const fakeRoutes: Routes = [{ path: 'login', component: LoginComponent }];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        ToastrModule.forRoot({}),
        NgxsModule.forRoot([AuthState]),
        RouterTestingModule.withRoutes(fakeRoutes),
        HttpClientTestingModule,
      ],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should call login action', () => {
    store.dispatch(new Login({ email: '', password: '' }));

    const login = store.selectSnapshot((state) => state.auth.login);
    expect(login).toBe(true);
  });
});

/**
 * Testar se usuário preencheu os dados corretamente
 * Testar se usuário clicou no botão de login e a request foi disparada
 *
 */
