import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

import { sidebarMenuItems } from 'src/app/core/utils/constants';
import { Logout } from 'src/app/modules/auth/store/actions/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems = sidebarMenuItems;
  logoutSubscription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private actions: Actions
  ) {}

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.addListener();
  }

  addListener() {
    this.logoutSubscription = this.actions
      .pipe(ofActionSuccessful(Logout))
      .subscribe(() => this.router.navigate(['/auth']));
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
