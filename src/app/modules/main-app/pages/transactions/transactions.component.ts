import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofActionSuccessful } from '@ngxs/store';

import { TransactionDialogComponent } from '../../../../shared/components/molecules/transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openNewTransactionDialog() {
    this.dialog.open(TransactionDialogComponent, {
      maxWidth: '400px',
      minWidth: '350px',
      data: {
        isEdit: false,
      }
    });
  }
}
