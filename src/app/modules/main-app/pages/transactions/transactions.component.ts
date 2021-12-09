import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofActionSuccessful } from '@ngxs/store';

import { NewTransactionDialogComponent } from './components/new-transaction-dialog/new-transaction-dialog.component';
import { SaveTransaction } from './store/transactions.actions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openNewTransactionDialog() {
    this.dialog.open(NewTransactionDialogComponent, {
      maxWidth: '400px',
      minWidth: '350px',
    });
  }
}
