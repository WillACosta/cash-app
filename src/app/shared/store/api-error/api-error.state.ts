import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Action, State, StateContext } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';

import { HandleApiError } from './api-error.actions';

@State({
  name: 'apiError',
  defaults: null,
})
@Injectable({
  providedIn: 'root',
})
export class ApiErrorState {
  constructor(private dialog: MatDialog, private toastr: ToastrService) {}

  @Action(HandleApiError)
  handleApiError(ctx: StateContext<void>, { error, action }: HandleApiError) {
    this.toastr.warning(
      'Não foi possível processar sua solicitação tente novamente mais tarde!',
      'Oops! Occoreu um erro'
    );
  }
}
