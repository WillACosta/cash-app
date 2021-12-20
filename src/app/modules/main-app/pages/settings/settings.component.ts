import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';

import {
  ChangeTheme,
  ThemeProps,
} from 'src/app/shared/store/theme/theme.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  themeForm: FormGroup;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this.initForm(this.isActualThemeDark());
  }

  private initForm(themeValue: boolean) {
    this.themeForm = new FormGroup({
      darkMode: new FormControl(themeValue, Validators.required),
    });
  }

  private isActualThemeDark(): boolean {
    const theme = this._store.selectSnapshot<ThemeProps>(
      (state) => state.theme.activeTheme
    );

    return theme.mode === 'dark';
  }

  toggleTheme() {
    const themeMode = this.themeForm.value.darkMode ? 'dark' : 'light';
    this._store.dispatch(new ChangeTheme({ mode: themeMode }));
  }
}
