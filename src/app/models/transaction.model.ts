import { Deserializable } from './deserializable.model';

export class Transaction implements Deserializable {
  [key: string]: any;
  id: number;
  amount: number;
  currency: string;
  date: string;
  type: string;
  isPayedOrReceived: boolean | null;
  description: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export interface TransactionProps {
  type: 'incoming' | 'expense';
  date: string;
  description: string;
  amount: number;
  isPayedOrReceived: boolean | null;
}

export interface PaginatedTransactions {
  transactions: Transaction[];
  resultsLength: number;
}
