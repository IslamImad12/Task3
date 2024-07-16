import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Transaction } from 'src/app/models/transaction';
import 'chart.js/auto'; // ADD THIS

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
})
export class TransactionChartComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @Input() transactions: Transaction[] = [];

  chart: Chart | null = null;

  constructor() {
    // Register necessary chart.js components
    Chart.register(...registerables);
    this.chart?.destroy();
  }

  ngAfterViewInit(): void {
    if (this.transactions.length > 0) {
      this.renderChart();
    }
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart if it exists
    }
    if (this.transactions.length > 0) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy(); // Ensure chart is destroyed when component is destroyed
  }

  renderChart(): void {
    const labels = this.transactions.map((transaction) => transaction.date);
    const data = this.transactions.map((transaction) => transaction.amount);

    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Transactions',
            data: data,
            fill: false,
            borderColor: '#3252dfda',
            tension: 0.1,
          },
        ],
      },
    });
  }
}
