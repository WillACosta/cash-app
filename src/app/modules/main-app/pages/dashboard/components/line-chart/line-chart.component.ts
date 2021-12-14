import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';

import { MainState } from '../../../../../../modules/main-app/store/state/main.state';
import { Transaction } from '../../../../../../models/transaction.model';
import { UpdateTransactions } from '../../../../../../shared/store/shared.actions';
import { ChartService } from 'src/app/services/chart.service';

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
  constructor(private actions$: Actions, private chartService: ChartService) {}

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
        const incomingResults =
          this.chartService.getGroupedAmountAndMonthLabels(incoming);
        const expenseResults =
          this.chartService.getGroupedAmountAndMonthLabels(expense);

        if (
          incomingResults.amountValues.length &&
          expenseResults.amountValues.length &&
          incomingResults.amountValues.length <
            expenseResults.amountValues.length
        ) {
          this.lineChartData.datasets[0].data =
            this.chartService.getCorrelatedMonthValues(
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
          this.lineChartData.datasets[1].data =
            this.chartService.getCorrelatedMonthValues(
              incomingResults,
              expenseResults
            );
        } else {
          this.lineChartData.datasets[1].data = expenseResults.amountValues;
        }

        this.lineChartData.labels = this.chartService.getUniqueMonthLabels(
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
}
