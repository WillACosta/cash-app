import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { TransactionsService } from 'src/app/services/transactions.service';

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
    return this.getFilteredTransactions(state.allTransactions, 'incoming');
  }

  @Selector()
  static expenseTransactions(state: MainStateModel): Transaction[] {
    return this.getFilteredTransactions(state.allTransactions, 'expense');
  }

  @Action(GetAllTransactions)
  getAllTransactions(context: StateContext<MainStateModel>) {
    return this.transactionsService
      .getAllTransactions()
      .pipe(
        tap((transactions) =>
          this.patchTransactionState(context, transactions, 'allTransactions')
        )
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

  private patchTransactionState(
    context: StateContext<MainStateModel>,
    transactions: Transaction[],
    stateName: string
  ) {
    const deserializableData = transactions.map((t) => {
      return new Transaction().deserialize(t);
    });

    context.patchState({ [stateName]: deserializableData });
  }

  private static getFilteredTransactions(
    transactions: Transaction[],
    filterBy: string
  ): Transaction[] {
    return transactions.filter((transaction) => {
      return transaction.type === filterBy;
    });
  }
}
