import { TransactionProps } from 'src/app/models/transaction.model';

export class SaveTransaction {
  static readonly type = '[Transactions] Save Transaction';
  constructor(public payload: TransactionProps) {}
}
