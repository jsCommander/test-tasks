import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'jsc-clock-control',
  templateUrl: './clock-control.component.html',
  styleUrls: ['./clock-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockControlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
