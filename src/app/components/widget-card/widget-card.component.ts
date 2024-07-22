import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-widget-card',
  templateUrl: './widget-card.component.html',
  styleUrls: ['./widget-card.component.scss']
})
export class WidgetCardComponent {
  @Input() title: string;
  @Input() value: string | number;
  @Input() change: string | number;
  @Input() comparisonText: string;

  constructor() {
    this.title = '';
    this.value = '';
    this.change = '';
    this.comparisonText = '';
  }
}
