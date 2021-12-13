import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { format } from 'date-fns';

import { MainState } from '../../../../../../modules/main-app/store/state/main.state';
import { Transaction } from '../../../../../../models/transaction.model';
import { UpdateTransactions } from '../../../../../../shared/store/shared.actions';

import {
  lineChartConfiguration,
  lineChartOptions,
} from './chart-configuration';

import * as _ from 'lodash';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  constructor(private actions$: Actions) {}

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
    this.chart?.update();
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

        if (
          incomingResults.amountValues.length &&
          expenseResults.amountValues.length &&
          incomingResults.amountValues.length <
            expenseResults.amountValues.length
        ) {
          this.lineChartData.datasets[0].data = this.getCorrelatedMonthValues(
            incomingResults,
            expenseResults
          );
        } else {
          this.lineChartData.datasets[0].data = incomingResults.amountValues;
        }

        if (
          incomingResults.amountValues.length &&
          expenseResults.amountValues.length &&
          incomingResults.amountValues.length >
            expenseResults.amountValues.length
        ) {
          this.lineChartData.datasets[1].data = this.getCorrelatedMonthValues(
            incomingResults,
            expenseResults
          );
        } else {
          this.lineChartData.datasets[1].data = expenseResults.amountValues;
        }

        this.lineChartData.labels = this.getUniqueMonthLabels(
          incomingResults.labelValues,
          expenseResults.labelValues
        );

        this.chart?.update();
      })
    );

    this.subscription.add(
      this.actions$
        .pipe(ofActionSuccessful(UpdateTransactions))
        .subscribe(() => {
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

  private getUniqueMonthLabels(
    incomingLabels: Array<any>,
    expenseLabels: Array<any>
  ): Array<string> {
    const mergedLabels = _.merge(incomingLabels, expenseLabels);
    return _.uniq(mergedLabels);
  }

  private getCorrelatedMonthValues(incoming: any, expense: any) {
    if (!incoming.amountValues?.length && !expense.amountValues?.length)
      return [];

    if (!incoming.amountValues?.length) return [];
    if (!expense.amountValues?.length) return [];

    let result: Array<any> = [];

    if (incoming.amountValues.length > expense.amountValues.length) {
      incoming.labelValues.forEach((label: string, index: number) => {
        if (expense.labelValues.includes(label)) {
          result.push(
            expense.amountValues[_.indexOf(expense.labelValues, label)]
          );
        } else {
          result.push(0);
        }
      });
    }

    if (expense.amountValues.length > incoming.amountValues.length) {
      expense.labelValues.forEach((label: string, index: number) => {
        if (incoming.labelValues.includes(label)) {
          result.push(
            incoming.amountValues[_.indexOf(incoming.labelValues, label)]
          );
        } else {
          result.push(0);
        }
      });
    }

    return result;
  }
}
