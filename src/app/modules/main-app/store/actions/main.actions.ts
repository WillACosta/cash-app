import { TransactionPaginatedProps } from 'src/app/models/transaction-paginated-props';

export class GetAllTransactions {
  static readonly type = '[Main] Get All Transactions';
}

export class GetPaginatedTransactions {
  static readonly type = '[Main] Get Paginated Transactions';

  constructor(public payload: TransactionPaginatedProps) {}
}
