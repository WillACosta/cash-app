import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  tokenKey: string = '@cash-app';

  setItem(value: string) {
    const encoded = btoa(value);
    localStorage.setItem(this.tokenKey, encoded);
  }

  getItem(): string {
    if (localStorage.getItem(this.tokenKey)?.length) {
      return atob(localStorage.getItem(this.tokenKey)!);
    }

    return '';
  }

  removeItem() {
    localStorage.removeItem(this.tokenKey);
  }
}
