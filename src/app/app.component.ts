import { Component, ViewChild } from "@angular/core";
import { DataService } from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: any = {};
  selectedDateRange = 'this-month';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchData(this.selectedDateRange);
  }

  onDateRangeChange(dateRange: string): void {
    this.selectedDateRange = dateRange;
    this.fetchData(dateRange);
  }

  fetchData(dateRange: string): void {
    this.dataService.getData(dateRange).subscribe(response => {
      this.data = response[dateRange] || {};
    });
  }
}
