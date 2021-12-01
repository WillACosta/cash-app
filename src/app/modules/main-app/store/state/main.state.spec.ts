import { TestBed } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import {
  fakeMainStateData,
  fakeTransactionsData,
  TransactionsServiceMock,
} from 'src/app/core/spec/mocks';

import { Transaction } from 'src/app/models/transaction.model';
import { TransactionsService } from 'src/app/services/transactions.service';
import { GetAllTransactions } from '../actions/main.actions';

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

  it('should dispatch `GetAllTransactions` Action', () => {
    spyOn(store, 'dispatch');

    store.dispatch(new GetAllTransactions());
    expect(store.dispatch).toHaveBeenCalledWith(new GetAllTransactions());
  });

  it('should return the state with `allTransactions`', () => {
    store.dispatch(new GetAllTransactions());
    expect(store.selectSnapshot(MainState.allTransactions)).toEqual(
      fakeTransactionsData
    );
  });

  it('should select `allTransactions`', (done) => {
    store.dispatch(new GetAllTransactions());

    store
      .select(MainState.allTransactions)
      .subscribe((transactions: Transaction[]) => {
        expect(transactions).toEqual(fakeTransactionsData);
        done();
      });
  });

  it('should select `incoming` of `allTransactions`', (done) => {
    store.dispatch(new GetAllTransactions());

    store
      .select(MainState.incomingTransactions)
      .subscribe((transactions: Transaction[]) => {
        expect(transactions).toEqual(
          fakeTransactionsData.filter((t) => t.type === 'incoming')
        );

        done();
      });
  });

  it('should select `expense` transactions', (done) => {
    store.dispatch(new GetAllTransactions());

    store
      .select(MainState.expenseTransactions)
      .subscribe((transactions: Transaction[]) => {
        expect(transactions).toEqual(
          fakeTransactionsData.filter((t) => t.type === 'expense')
        );

        done();
      });
  });
});
