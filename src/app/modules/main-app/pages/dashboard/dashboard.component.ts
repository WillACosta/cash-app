import { Component, OnDestroy, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';

import { Transaction } from '../../../../models/transaction.model';
import { MainState } from '../../../../modules/main-app/store/state/main.state';
import { GetAllTransactions } from '../../store/actions/main.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Select(MainState.allTransactions)
  transactions$: Observable<Transaction[]>;

  @Select(MainState.receivedIncomingTransactions)
  incomingTransactions$: Observable<Transaction[]>;

  @Select(MainState.payedExpenseTransactions)
  expenseTransactions$: Observable<Transaction[]>;

  subscriptions: Subscription[] = [
    new Subscription(),
    new Subscription(),
    new Subscription(),
  ];

  totalIncomingAmount: number = 0;
  totalExpenseAmount: number = 0;
  differenceAmount: number = 0;

  constructor(private store: Store) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllTransactions());
    this.setListeners();
  }

  private setListeners(): void {
    this.subscriptions[0] = this.incomingTransactions$.subscribe((data) => {
      this.totalIncomingAmount = this.getTotalAmountOfTransactions(data);
    });

    this.subscriptions[1] = this.expenseTransactions$.subscribe((data) => {
      this.totalExpenseAmount = this.getTotalAmountOfTransactions(data);
    });

    this.subscriptions[2] = combineLatest([
      this.expenseTransactions$,
      this.incomingTransactions$,
    ]).subscribe((_) => {
      this.differenceAmount = this.getDifferenceAmountOfTransactions();
    });
  }

  private getTotalAmountOfTransactions(transactions: Transaction[]): number {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  }

  private getDifferenceAmountOfTransactions(): number {
    if (this.totalIncomingAmount > this.totalExpenseAmount) {
      return this.totalIncomingAmount - this.totalExpenseAmount;
    }

    return this.totalExpenseAmount - this.totalIncomingAmount;
  }
}
