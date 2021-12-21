import { ChartConfiguration } from 'chart.js';

export const lineChartConfiguration: ChartConfiguration['data'] = {
  datasets: [
    {
      data: [],
      label: 'Entradas',
      backgroundColor: 'rgba(0, 255, 0, 0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    },
    {
      data: [],
      label: 'Saídas',
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      fill: 'origin',
    },
  ],
  labels: [],
};

export const lineChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scales: {
    x: {},
    'y-axis-0': {
      position: 'left',
    },
    'y-axis-1': {
      position: 'right',
      grid: {
        color: 'rgba(148,159,177,1)',
      },
    },
  },
  locale: 'pt-br',
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return `R$ ${tooltipItem.formattedValue}`;
        },
      },
    },
  },
};
