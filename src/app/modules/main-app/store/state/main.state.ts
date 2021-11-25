import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { TransactionsService } from 'src/app/services/transactions.service';

import { Transaction } from '../../../../models/transaction.model';
import { GetTransactions } from '../actions/main.actions';

class MainStateModel {
  transactions: Transaction[];
}

@State<MainStateModel>({
  name: 'main',
  defaults: {
    transactions: [],
  },
})
@Injectable()
export class MainState {
  constructor(private transactionsService: TransactionsService) {}

  @Selector()
  static transactions(state: MainStateModel) {
    return state.transactions;
  }

  @Action(GetTransactions)
  getTransactions({ patchState }: StateContext<MainStateModel>) {
    return this.transactionsService.getTransactions().pipe(
      tap((transactions) => {
        patchState({ transactions });
      })
    );
  }
}
