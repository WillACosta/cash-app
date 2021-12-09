import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Actions, ofActionSuccessful, Store } from '@ngxs/store';

import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';

import { getRangeLabel } from 'src/app/core/utils';
import { Transaction } from 'src/app/models/transaction.model';
import { GetPaginatedTransactions } from 'src/app/modules/main-app/store/actions/main.actions';
import { UpdateTransactions } from 'src/app/shared/store/shared.actions';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-c-table',
  templateUrl: './c-table.component.html',
  styleUrls: ['./c-table.component.scss'],
})
export class CTableComponent implements OnInit, AfterViewInit {
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

  resultsLength = 0;

  constructor(
    private _store: Store,
    private actions$: Actions,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.translateMatPaginator();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

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
      .subscribe();

    this._store
      .select((state) => state.main.paginatedTransactions)
      .subscribe((stateValue) => {
        this.dataSource.data = stateValue.transactions;
        this.resultsLength = stateValue.resultsLength;
      });

    this.actions$
      .pipe(
        ofActionSuccessful(UpdateTransactions),
        tap(() => this.dataSource)
      )
      .subscribe((_) => this.changeDetectorRefs.detectChanges());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
