import { Component, OnInit, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomTimeConvertor } from 'libs/angular-custom-controls/src/lib/clock-control/clock-control.interface';
import {
  ClockTime,
  CLOCK_SELECT_TYPE,
} from 'libs/angular-custom-controls/src/lib/clock-control/clock-svg/clock-svg.interface';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'jsc-clock-control',
  templateUrl: './clock-control.component.html',
  styleUrls: ['./clock-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ClockControlComponent), multi: true }],
})
export class ClockControlComponent<T> implements OnInit, ControlValueAccessor {
  @Input() timeConverter: CustomTimeConvertor<any> = this.getDefaultTimeConverter();

  time$ = new ReplaySubject<ClockTime>(1);

  private onChange: Function | null = null;

  constructor() {}

  ngOnInit(): void {}

  writeValue(time: T) {
    this.time$.next(this.timeConverter.setter(time));
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}

  onTimeChange(time: ClockTime): void {
    if (!this.onChange) {
      return;
    }

    this.onChange(this.timeConverter.getter(time));
  }

  private getDefaultTimeConverter(): CustomTimeConvertor<string> {
    const fillZero = (num: number): string => {
      return num < 10 ? `0${num}` : `${num}`;
    };

    return {
      setter: (value) => {
        const [hours, minutes] = value.split(':');
        return {
          hours: Number(hours),
          minutes: Number(minutes),
        };
      },
      getter: (time) => {
        return `${fillZero(time.hours)}:${fillZero(time.minutes)}`;
      },
    };
  }
}
