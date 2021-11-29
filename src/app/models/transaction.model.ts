import { Deserializable } from './deserializable.model';

export class Transaction implements Deserializable {
  id: number;
  amount: number;
  currency: string;
  date: string;
  type: string;
  isPayed: boolean | null;
  description: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
