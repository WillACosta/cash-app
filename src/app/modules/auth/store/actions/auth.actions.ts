import { AccountProps } from "src/app/models/account-props.model";

export class Login {
  static readonly type = '[AUTH] Login';

  constructor(public payload: AccountProps) {}
}

export class Logout {
  static readonly type = '[AUTH] Logout';
}