import { Routes } from '@angular/router';
import { Observable, of } from 'rxjs';

import { LoginComponent } from 'src/app/modules/auth/pages/login/login.component';

export class AuthServiceMock {
  login(): Observable<any> {
    return of({
      token: 'fake-token',
    });
  }
}

export const fakeRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
];
