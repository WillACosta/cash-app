import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad() {
    var fakeAuthApiResponse = false;

    if (fakeAuthApiResponse) {
      return true;
    }

    this.router.navigate(['/auth']);
    return false;
  }
}
