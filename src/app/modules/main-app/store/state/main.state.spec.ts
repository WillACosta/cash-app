import { TestBed } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { TransactionsServiceMock } from 'src/app/core/spec/mocks';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionsService } from 'src/app/services/transactions.service';
import { GetTransactions } from '../actions/main.actions';

import { MainState } from './main.state';

describe('MainState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MainState])],
      providers: [
        {
          provide: TransactionsService,
          useClass: TransactionsServiceMock,
        },
      ],
    });

    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should return the default state', () => {
    expect(store.selectSnapshot(MainState)).toEqual({
      transactions: [],
    });
  });

  it('should dispatch `GetTransactions` Action', () => {
    spyOn(store, 'dispatch');

    store.dispatch(new GetTransactions());
    expect(store.dispatch).toHaveBeenCalledWith(new GetTransactions());
  });

  it('should return the state with transactions', () => {
    store.dispatch(new GetTransactions());
    expect(store.selectSnapshot(MainState)).toEqual({
      transactions: [
        {
          id: 1,
          date: '2021-01-01',
          amount: 100,
          description: 'Description',
          type: 'expanse',
          currency: 'BRL',
          isPayed: false,
        },
      ],
    });
  });

  it('should select transactions', (done) => {
    store.dispatch(new GetTransactions());

    store
      .select(MainState.transactions)
      .subscribe((transactions: Transaction[]) => {
        expect(transactions).toEqual([
          {
            id: 1,
            date: '2021-01-01',
            amount: 100,
            description: 'Description',
            type: 'expanse',
            currency: 'BRL',
            isPayed: false,
          },
        ]);
        done();
      });
  });
});
