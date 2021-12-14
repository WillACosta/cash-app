import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription, tap } from 'rxjs';

import {
  SaveTransaction,
  UpdateTransaction,
} from '../../../../modules/main-app/pages/transactions/store/transactions.actions';

import { UpdateTransactions } from '../../../store/shared.actions';
import { PageState, TransactionDialogData } from './transaction-dialog.utils';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
})
export class TransactionDialogComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    private actions$: Actions,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: TransactionDialogData
  ) {}

  transactionForm: FormGroup;

  transactionType = [
    { value: 'incoming', viewValue: 'Entrada' },
    { value: 'expense', viewValue: 'Saída' },
  ];

  PageStateType = PageState;
  pageState = PageState.initial;

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.initForm();
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveOrUpdateTransaction() {
    if (this.transactionForm.invalid) return;

    this.pageState = this.PageStateType.loading;

    const payload = {
      ...this.transactionForm.value,
      amount: Number(this.transactionForm.value.amount),
    };

    this.data.isEdit
      ? this.store.dispatch(
          new UpdateTransaction(String(this.data.transaction.id), payload)
        )
      : this.store.dispatch(new SaveTransaction(payload));

    this.closeModal();
  }

  closeModal() {
    this.transactionForm.reset();
    this.dialogRef.close();
  }

  private initForm() {
    if (this.data.isEdit) {
      const transaction = this.data.transaction;
      this.transactionForm = new FormGroup({
        type: new FormControl(transaction.type, [Validators.required]),
        amount: new FormControl(transaction.amount, [
          Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
          Validators.required,
        ]),
        date: new FormControl(new Date(transaction.date), [
          Validators.required,
        ]),
        description: new FormControl(transaction.description, [
          Validators.required,
        ]),
        isPayed: new FormControl(transaction.isPayed),
      });
    } else {
      this.transactionForm = new FormGroup({
        type: new FormControl('', [Validators.required]),
        amount: new FormControl(null, [
          Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
          Validators.required,
        ]),
        date: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        isPayed: new FormControl(false),
      });
    }
  }

  private setListeners() {
    this.subscription.add(
      this.actions$
        .pipe(
          ofActionSuccessful(SaveTransaction),
          tap(() => {
            this.pageState = this.PageStateType.loaded;
          })
        )
        .subscribe(() => {
          this.toastr.success('Transação salva com sucesso!');
          this.store.dispatch(new UpdateTransactions());

          this.closeModal();
        })
    );
  }
}
