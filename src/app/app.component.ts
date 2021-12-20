import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { ChangeTheme, ThemeProps } from './shared/store/theme/theme.actions';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private _store: Store) {}

  ngOnInit(): void {
    const theme = this._store.selectSnapshot<ThemeProps>(
      (state) => state.theme.activeTheme
    );

    theme
      ? this._store.dispatch(new ChangeTheme({ mode: theme.mode }))
      : this._store.dispatch(new ChangeTheme({ mode: 'light' }));
  }
}
