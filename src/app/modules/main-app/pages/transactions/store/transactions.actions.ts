import { TransactionProps } from 'src/app/models/transaction.model';

export class SaveTransaction {
  static readonly type = '[Transactions] Save Transaction';
  constructor(public payload: TransactionProps) {}
}

export class DeleteTransaction {
  static readonly type = '[Transactions] Delete Transaction';
  constructor(public id: string) {}
}

export class UpdateTransaction {
  static readonly type = '[Transactions] Update Transaction';
  constructor(public id: string, public payload: TransactionProps) {}
}
