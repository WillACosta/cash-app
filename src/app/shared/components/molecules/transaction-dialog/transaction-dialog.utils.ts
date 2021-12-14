import { Transaction } from 'src/app/models/transaction.model';

export enum PageState {
  initial,
  loading,
  loaded,
}

export interface TransactionDialogData {
  transaction: Transaction;
  isEdit: boolean;
}
