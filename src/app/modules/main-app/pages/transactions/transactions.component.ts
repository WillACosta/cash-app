import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/models/transaction.model';
import { MainState } from '../../store/state/main.state';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, AfterViewInit {
  @Select(MainState.paginatedTransactions)
  transactions$: Observable<Transaction[]>;

  constructor() {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
}
