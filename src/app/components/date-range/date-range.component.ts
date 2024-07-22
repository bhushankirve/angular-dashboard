import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent {
  @Output() dateRangeChange = new EventEmitter<string>();
  DateRange = [
    { value: 'this-month', viewValue: 'This Month' },
    { value: 'last-month', viewValue: 'Last Month' },
  ];

  onDateChange(event: any): void {
    this.dateRangeChange.emit(event.value);
  }
}
