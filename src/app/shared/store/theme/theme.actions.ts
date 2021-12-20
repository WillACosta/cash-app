export class ChangeTheme {
  static readonly type = '[Theme] Change Theme';
  constructor(public payload: ThemeProps) {}
}

export interface ThemeProps {
  mode: 'light' | 'dark' | null;
}
