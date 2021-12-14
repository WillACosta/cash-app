import { Injectable } from '@angular/core';

import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';

import { HandleApiError } from '../../../../../shared/store/api-error/api-error.actions';
import { TransactionsService } from '../../../../../services/transactions.service';

import {
  DeleteTransaction,
  SaveTransaction,
  UpdateTransaction,
} from './transactions.actions';

import { UpdateTransactions } from '../../../../../shared/store/shared.actions';

@State({
  name: 'transactionsState',
  defaults: null,
})
@Injectable()
export class TransactionsState {
  constructor(private transactionsService: TransactionsService) {}

  @Action(SaveTransaction)
  saveTransaction(ctx: StateContext<any>, { payload }: SaveTransaction) {
    return this.transactionsService.saveTransaction(payload).pipe(
      tap(() => ctx.dispatch(new UpdateTransactions())),
      catchError((error) => {
        return ctx.dispatch(
          new HandleApiError(new SaveTransaction(payload), error)
        );
      })
    );
  }

  @Action(DeleteTransaction)
  deleteTransaction(ctx: StateContext<any>, { id }: DeleteTransaction) {
    return this.transactionsService.deleteTransaction(id).pipe(
      tap(() => ctx.dispatch(new UpdateTransactions())),
      catchError((error) => {
        return ctx.dispatch(
          new HandleApiError(new DeleteTransaction(id), error)
        );
      })
    );
  }

  @Action(UpdateTransaction)
  updateTransaction(
    ctx: StateContext<any>,
    { id, payload }: UpdateTransaction
  ) {
    return this.transactionsService.updateTransaction(id, payload).pipe(
      tap(() => ctx.dispatch(new UpdateTransactions())),
      catchError((error) => {
        return ctx.dispatch(
          new HandleApiError(new UpdateTransaction(id, payload), error)
        );
      })
    );
  }
}
