import { Component, OnDestroy, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { Transaction } from 'src/app/models/transaction.model';
import { MainState } from 'src/app/modules/main-app/store/state/main.state';
import { GetTransactions } from '../../store/actions/main.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  incomingTransactionsSubscription: Subscription;

  @Select(MainState.transactions)
  transactions$: Observable<Transaction[]>;

  @Select(MainState.incomingTransactions)
  incomingTransactions$: Observable<Transaction[]>;

  totalIncomingAmount: number = 0;

  constructor(private store: Store) {}

  ngOnDestroy(): void {
    this.incomingTransactionsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetTransactions());

    this.setListeners();
  }

  private setListeners() {
    this.incomingTransactionsSubscription =
      this.incomingTransactions$.subscribe((data) => {
        this.totalIncomingAmount = data.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );
      });
  }
}
