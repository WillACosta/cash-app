import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should be able to get and set an item', () => {
    const value = 'test-item';

    service.setItem(value);
    expect(service.getItem()).toEqual(value);
  });

  test('should be able to remove a item', () => {
    service.removeItem();

    expect(service.getItem()).toBe('');
  });
});
