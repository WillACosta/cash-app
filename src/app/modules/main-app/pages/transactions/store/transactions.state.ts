import { Injectable } from '@angular/core';

import { Action, State, StateContext } from '@ngxs/store';
import { catchError } from 'rxjs';

import { HandleApiError } from '../../../../../shared/store/api-error/api-error.actions';
import { TransactionsService } from '../../../../../services/transactions.service';
import { SaveTransaction } from './transactions.actions';

@State({
  name: 'transactionsState',
  defaults: {},
})
@Injectable()
export class TransactionsState {
  constructor(private transactionsService: TransactionsService) {}

  @Action(SaveTransaction)
  saveTransaction(ctx: StateContext<any>, { payload }: SaveTransaction) {
    return this.transactionsService.saveTransaction(payload).pipe(
      catchError((error) => {
        return ctx.dispatch(
          new HandleApiError(new SaveTransaction(payload), error)
        );
      })
    );
  }
}
