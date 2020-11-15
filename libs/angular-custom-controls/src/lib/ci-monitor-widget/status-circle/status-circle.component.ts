import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'jsc-status-circle',
  templateUrl: './status-circle.component.html',
  styleUrls: ['./status-circle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusCircleComponent implements OnChanges {
  @Input() text: string = '';
  @Input() color: string | null = 'yellow';
  @Input() radius: number = 25;

  fontSize: string;

  constructor() {
    this.fontSize = this.getFontSize(this.radius);
  }

  ngOnChanges(sm: SimpleChanges) {
    if (sm.radius) {
      this.fontSize = this.getFontSize(this.radius);
    }
  }

  private getFontSize(radius: number): string {
    return `${Math.round(radius / 3)}px`;
  }
}
