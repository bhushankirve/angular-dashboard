// donut-chart.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from 'ng-apexcharts';
import { DataService } from 'src/app/services/data.service';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnChanges {
  @Input() dateRange: string = 'this-month';

  public chartOptions: ChartOptions = {
    series: [],
    chart: { type: 'donut' },
    labels: ['Refferal','On-Site', 'Direct'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' }
        }
      }
    ]
  };

  constructor(private dataService: DataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateRange']) {
      this.fetchData(this.dateRange);
    }
  }

  fetchData(dateRange: string): void {
    this.dataService.getData(this.dateRange).subscribe(data => {
      const chartData = data[dateRange];
      if (chartData && chartData.pageViews) {
        this.chartOptions.series = chartData.pageViews.series || [];
        this.chartOptions.labels = chartData.pageViews.labels || [];
      }
    });
  }
}
