export interface Transaction {
  id: number;
  amount: number;
  currency: string;
  date: string;
  type: string;
  isPayed: boolean | null;
  description: string;
}

enum sourceType {
  expanse,
  income,
}