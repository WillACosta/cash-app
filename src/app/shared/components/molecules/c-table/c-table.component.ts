import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';

import { Transaction } from '../../../../models/transaction.model';
import { DeleteTransaction } from '../../../../modules/main-app/pages/transactions/store/transactions.actions';
import { getRangeLabel } from '../../../../core/utils';
import { GetPaginatedTransactions } from '../../../../modules/main-app/store/actions/main.actions';
import { UpdateTransactions } from '../../../../shared/store/shared.actions';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-c-table',
  templateUrl: './c-table.component.html',
  styleUrls: ['./c-table.component.scss'],
})
export class CTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'date',
    'description',
    'type',
    'amount',
    'actions',
  ];

  dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscriptions: Subscription[] = [];
  resultsLength = 0;

  constructor(
    private _store: Store,
    private actions$: Actions,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.translateMatPaginator();
  }

  ngAfterViewInit() {
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editTransaction(transaction: Transaction) {
    this.dialog.open(TransactionDialogComponent, {
      maxWidth: '400px',
      minWidth: '350px',
      data: {
        transaction: transaction,
        isEdit: true,
      },
    });
  }

  deleteTransaction(transaction: Transaction) {
    this._store.dispatch(new DeleteTransaction(String(transaction.id)));
  }

  private setListeners() {
    this.subscriptions.push(
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))
    );

    this.subscriptions.push(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            // loading
            return this._store
              .dispatch(
                new GetPaginatedTransactions({
                  page: this.paginator.pageIndex + 1,
                  limit: this.paginator.pageSize,
                  sortBy: this.sort.active,
                  sortOrder: this.sort.direction,
                })
              )
              .pipe(catchError(() => observableOf(null)));
          }),
          map(() => null)
        )
        .subscribe()
    );

    this.subscriptions.push(
      this._store
        .select((state) => state.main.paginatedTransactions)
        .subscribe((stateValue) => {
          this.dataSource.data = stateValue.transactions;
          this.resultsLength = stateValue.resultsLength;
        })
    );

    this.subscriptions.push(
      this.actions$
        .pipe(ofActionSuccessful(UpdateTransactions))
        .subscribe((_) =>
          this._store.dispatch(
            new GetPaginatedTransactions({
              page: 1,
              limit: 5,
              sortBy: 'date',
              sortOrder: 'desc',
            })
          )
        )
    );
  }

  private translateMatPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Transações por página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.getRangeLabel = getRangeLabel;
  }
}
