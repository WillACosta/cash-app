import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { Store } from '@ngxs/store';

import { AuthState } from 'src/app/modules/auth/store/state/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private store: Store) {}

  canLoad() {
    if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
      return true;
    }

    this.router.navigate(['/auth']);
    return false;
  }
}
