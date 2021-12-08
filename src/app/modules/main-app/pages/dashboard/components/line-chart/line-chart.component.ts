import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

import { Select } from '@ngxs/store';
import * as _ from 'lodash';
import { format } from 'date-fns';
import { combineLatest, Observable, Subscription } from 'rxjs';

import { MainState } from 'src/app/modules/main-app/store/state/main.state';
import { Transaction } from 'src/app/models/transaction.model';
import {
  lineChartConfiguration,
  lineChartOptions,
} from './chart-configuration';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  public lineChartData: ChartConfiguration['data'] = lineChartConfiguration;
  public lineChartOptions: ChartConfiguration['options'] = lineChartOptions;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Select(MainState.incomingTransactions)
  incomingTransactions$: Observable<Transaction[]>;

  @Select(MainState.expenseTransactions)
  expenseTransactions$: Observable<Transaction[]>;

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setListeners() {
    this.subscription.add(
      combineLatest([
        this.incomingTransactions$,
        this.expenseTransactions$,
      ]).subscribe(([incoming, expense]) => {
        const incomingResults = this.getGroupedAmountAndMonthLabels(incoming);
        const expenseResults = this.getGroupedAmountAndMonthLabels(expense);

        this.lineChartData.datasets[0].data = incomingResults.amountValues;
        this.lineChartData.datasets[1].data = expenseResults.amountValues;

        this.lineChartData.labels = incomingResults.labelValues; // Combine Months and get unique labels
        this.chart?.update();
      })
    );
  }

  getGroupedAmountAndMonthLabels(data: Array<any>) {
    const orderedByDate = this.sortOrder(
      data.map((item) => {
        return {
          ...item,
          date: new Date(item.date),
        };
      })
    );

    const groupedByMont = _.groupBy(orderedByDate, (item) =>
      format(new Date(item.date), 'MMMM')
    );

    const convertedArray = this.objectToArray(groupedByMont);
    const monthKeys = Object.keys(groupedByMont);

    return this.getResultObject(convertedArray, monthKeys);
  }

  private sortOrder(data: Array<any>) {
    return data.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }

      if (a.date > b.date) {
        return 1;
      }

      return 0;
    });
  }

  private objectToArray(obj: any) {
    return Object.keys(obj).map((key) => obj[key]);
  }

  private getResultObject(array: Array<any>, monthKeys: Array<string>) {
    let result: Array<any> = [];

    array.forEach((item) => {
      const totalAmount = item.reduce(
        (acc: any, curr: any) => acc + curr.amount,
        0
      );

      result.push(totalAmount);
    });

    return { amountValues: result, labelValues: monthKeys };
  }
}
