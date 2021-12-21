import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { TransactionsService } from '../../services/transactions.service';

import {
  PaginatedTransactions,
  Transaction,
} from '../../../../models/transaction.model';

import {
  GetAllTransactions,
  GetPaginatedTransactions,
} from '../actions/main.actions';

class MainStateModel {
  allTransactions: Transaction[];
  paginatedTransactions: PaginatedTransactions;
}

@State<MainStateModel>({
  name: 'main',
  defaults: {
    allTransactions: [],
    paginatedTransactions: {
      transactions: [],
      resultsLength: 0,
    },
  },
})
@Injectable()
export class MainState {
  constructor(private transactionsService: TransactionsService) {}

  @Selector()
  static allTransactions(state: MainStateModel): Transaction[] {
    return state.allTransactions;
  }

  @Selector()
  static paginatedTransactions(state: MainStateModel): PaginatedTransactions {
    return state.paginatedTransactions;
  }

  @Selector()
  static incomingTransactions(state: MainStateModel): Transaction[] {
    return state.allTransactions.filter((t) => t.type === 'incoming');
  }

  @Selector()
  static expenseTransactions(state: MainStateModel): Transaction[] {
    return state.allTransactions.filter((t) => t.type === 'expense');
  }

  @Selector()
  static receivedIncomingTransactions(state: MainStateModel): Transaction[] {
    return state.allTransactions.filter(
      (t) => t.isPayedOrReceived === true && t.type === 'incoming'
    );
  }

  @Selector()
  static payedExpenseTransactions(state: MainStateModel): Transaction[] {
    return state.allTransactions.filter(
      (t) => t.isPayedOrReceived === true && t.type === 'expense'
    );
  }

  @Action(GetAllTransactions)
  getAllTransactions({ patchState, getState }: StateContext<MainStateModel>) {
    if (getState().allTransactions.length > 0) {
      return;
    }

    return this.transactionsService.getAllTransactions().pipe(
      tap((transactions) => {
        const deserializableData = transactions.map((t) => {
          return new Transaction().deserialize(t);
        });

        patchState({
          allTransactions: deserializableData,
        });
      })
    );
  }

  @Action(GetPaginatedTransactions)
  getPaginatedTransactions(
    { patchState }: StateContext<MainStateModel>,
    { payload }: GetPaginatedTransactions
  ) {
    return this.transactionsService
      .getPaginatedTransactions(
        payload.page,
        payload.limit,
        payload.sortBy,
        payload.sortOrder
      )
      .pipe(
        tap((response) =>
          patchState({
            paginatedTransactions: {
              transactions: response.body ?? [],
              resultsLength: Number(response.headers.get('X-Total-Count') ?? 0),
            },
          })
        )
      );
  }
}
