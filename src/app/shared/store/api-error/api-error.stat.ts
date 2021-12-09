import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, State, StateContext } from '@ngxs/store';
import { map } from 'rxjs';

import { ApiErrorDialogComponent } from '../../components/molecules/api-error-dialog/api-error-dialog.component';
import { HandleApiError } from './api-error.actions';

@State({
  name: 'apiError',
  defaults: null,
})
@Injectable({
  providedIn: 'root',
})
export class ApiErrorState {
  constructor(private dialog: MatDialog) {}

  @Action(HandleApiError)
  handleApiError(ctx: StateContext<void>, { error, action }: HandleApiError) {
    const dialogRef = this.dialog.open(ApiErrorDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().pipe(map(() => ctx.dispatch(action)));
  }
}
