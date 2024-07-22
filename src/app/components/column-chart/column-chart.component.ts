import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from 'ng-apexcharts';
import { DataService } from 'src/app/services/data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnChanges {
  @ViewChild('chart', { static: false }) chart!: ChartComponent;
  @Input() dateRange: string = 'this-month';

  public chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false // Vertical bars
      }
    },
    xaxis: {
      type: 'category',
      categories: []
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
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
      if (chartData && chartData.columnChart) {
        this.chartOptions.series = chartData.columnChart.series || [];
        this.chartOptions.xaxis.categories = chartData.columnChart.categories || [];
      }
    });
  }
}
