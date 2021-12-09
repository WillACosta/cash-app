import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { Subscription, tap } from 'rxjs';

import { SaveTransaction } from '../../store/transactions.actions';

enum PageState {
  initial,
  loading,
  loaded,
}

@Component({
  selector: 'app-new-transaction-dialog',
  templateUrl: './new-transaction-dialog.component.html',
  styleUrls: ['./new-transaction-dialog.component.scss'],
})
export class NewTransactionDialogComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<NewTransactionDialogComponent>,
    private actions$: Actions
  ) {}

  newTransactionForm: FormGroup;

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

  saveTransaction() {
    if (this.newTransactionForm.invalid) return;

    this.pageState = this.PageStateType.loading;

    const payload = {
      ...this.newTransactionForm.value,
      amount: Number(this.newTransactionForm.value.amount),
    };

    this.store.dispatch(new SaveTransaction(payload));
    this.closeModal();
  }

  closeModal() {
    this.newTransactionForm.reset();
    this.dialogRef.close();
  }

  private initForm() {
    this.newTransactionForm = new FormGroup({
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

  private setListeners() {
    this.subscription.add(
      this.actions$
        .pipe(
          ofActionSuccessful(SaveTransaction),
          tap(() => {
            this.pageState = this.PageStateType.loaded;
          })
        )
        .subscribe(() => this.closeModal())
    );
  }
}