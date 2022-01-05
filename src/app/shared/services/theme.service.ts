import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ThemeProps } from '../store/theme/theme.actions';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private _overlay: OverlayContainer) {}

  setTheme(mode: ThemeProps['mode']): Observable<ThemeProps> {
    this.handleDomClasses(mode);
    return of({ mode });
  }

  private handleDomClasses(mode: ThemeProps['mode']) {
    if (mode === 'dark') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme-material', 'dark-theme');

      this._overlay.getContainerElement().classList.remove('light-theme-material');
      this._overlay.getContainerElement().classList.add('dark-theme-material');
    } else {
      document.body.classList.remove('dark-theme-material', 'dark-theme');
      document.body.classList.add('light-theme');

      this._overlay.getContainerElement().classList.remove('dark-theme-material');
      this._overlay.getContainerElement().classList.add('light-theme-material');
    }
  }
}
