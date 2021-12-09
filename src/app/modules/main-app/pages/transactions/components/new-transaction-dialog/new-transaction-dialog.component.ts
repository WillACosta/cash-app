import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';

import { SaveTransaction } from '../../store/transactions.actions';

@Component({
  selector: 'app-new-transaction-dialog',
  templateUrl: './new-transaction-dialog.component.html',
  styleUrls: ['./new-transaction-dialog.component.scss'],
})
export class NewTransactionDialogComponent implements OnInit {
  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<NewTransactionDialogComponent>
  ) {}

  newTransactionForm: FormGroup;

  transactionType = [
    { value: 'incoming', viewValue: 'Entrada' },
    { value: 'expense', viewValue: 'Saída' },
  ];

  ngOnInit(): void {
    this.initForm();
  }

  saveTransaction() {
    if (this.newTransactionForm.invalid) return;

    const payload = {
      ...this.newTransactionForm.value,
      amount: Number(this.newTransactionForm.value.amount),
    };

    // Loading
    this.store.dispatch(new SaveTransaction(payload));
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
}
