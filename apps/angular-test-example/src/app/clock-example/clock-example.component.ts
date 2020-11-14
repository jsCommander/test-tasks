import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'ate-clock-example',
  templateUrl: './clock-example.component.html',
  styleUrls: ['./clock-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockExampleComponent {
  private startTime: string = '21:00';
  time = new FormControl(this.startTime);

  timeValue$: Observable<string> = this.time.valueChanges.pipe(startWith(this.startTime));
}
