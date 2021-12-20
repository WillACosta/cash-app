import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { ThemeService } from '../../services/theme.service';
import { ChangeTheme, ThemeProps } from './theme.actions';

class ThemeStateModel {
  activeTheme: ThemeProps;
}

@State<ThemeStateModel>({
  name: 'theme',
  defaults: {
    activeTheme: {
      mode: null,
    },
  },
})
@Injectable()
export class ThemeState {
  constructor(private _service: ThemeService) {}

  @Selector()
  static activeTheme(state: ThemeStateModel): ThemeProps {
    return state.activeTheme;
  }

  @Action(ChangeTheme)
  changeTheme(
    { setState }: StateContext<ThemeStateModel>,
    { payload }: ChangeTheme
  ) {
    return this._service.setTheme(payload.mode).pipe(
      tap(({ mode }) => {
        setState({
          activeTheme: {
            mode,
          },
        });
      })
    );
  }
}
