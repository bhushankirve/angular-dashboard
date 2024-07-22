import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { DataService } from 'src/app/services/data.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnChanges {
  @ViewChild('chart', { static: false }) chart!: ChartComponent;
  @Input() dateRange: string = 'this-month'; // Default date range

  public chartOptions: ChartOptions = {
    series: [],
    chart: {
      height: 350,
      type: "bubble"
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 0.8
    },
    title: {
      text: "Simple Bubble Chart"
    },
    xaxis: {
      tickAmount: 12,
      type: "category"
    },
    yaxis: {
      max: 70
    }
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
      if (chartData && chartData.bubbleChart) {
        this.chartOptions.series = chartData.bubbleChart.series || [];
        // Update chart options if necessary, e.g., xaxis or yaxis
        // this.chartOptions.xaxis.categories = chartData.bubbleChart.categories || [];
      }
    });
  }
}
