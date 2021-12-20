import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

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
      format(new Date(item.date), 'LLLL', { locale: ptBR })
    );

    const convertedArray = this.objectToArray(groupedByMont);
    const monthKeys = Object.keys(groupedByMont);

    return this.getResultObject(convertedArray, monthKeys);
  }

  getUniqueMonthLabels(
    incomingLabels: Array<any>,
    expenseLabels: Array<any>
  ): Array<string> {
    const mergedLabels = _.merge(incomingLabels, expenseLabels);
    return _.uniq(
      mergedLabels.map(
        (item: string) => item.charAt(0).toUpperCase() + item.slice(1)
      )
    );
  }

  getCorrelatedMonthValues(incoming: any, expense: any) {
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
