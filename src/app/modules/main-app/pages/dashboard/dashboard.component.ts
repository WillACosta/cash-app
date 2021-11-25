import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Transaction } from 'src/app/models/transaction.model';
import { MainState } from 'src/app/modules/main-app/store/state/main.state';
import { GetTransactions } from '../../store/actions/main.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Select(MainState.transactions) transactions$: Observable<Transaction[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetTransactions());
  }
}
