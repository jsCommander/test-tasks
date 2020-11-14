import { Component, OnInit, ChangeDetectionStrategy, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  CustomTimeConvertor,
  TimeType,
  TIME_TYPE,
} from 'libs/angular-custom-controls/src/lib/clock-control/clock-control.interface';
import { ClockTime } from 'libs/angular-custom-controls/src/lib/clock-control/clock-svg/clock-svg.interface';
import { TimeUtils } from 'libs/angular-custom-controls/src/lib/shared/time-utils';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jsc-clock-control',
  templateUrl: './clock-control.component.html',
  styleUrls: ['./clock-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ClockControlComponent), multi: true }],
})
export class ClockControlComponent<T> implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() set type(value: TIME_TYPE) {
    this.timeType.setValue(value);
  }
  @Input() timeConverter: CustomTimeConvertor<any> = this.getDefaultTimeConverter();

  setTime$ = new ReplaySubject<ClockTime>(1);
  timeChange$ = new Subject<ClockTime>();
  timeType = new FormControl();
  timeTypes: TimeType[] = [
    {
      type: TIME_TYPE.AM,
      name: 'AM',
    },
    {
      type: TIME_TYPE.PM,
      name: 'PM',
    },
  ];

  private destroy$ = new Subject();
  private onChange: Function | null = null;

  constructor() {
    this.timeType.setValue(TIME_TYPE.AM);
  }

  ngOnInit(): void {
    combineLatest([this.timeChange$, this.timeType.valueChanges.pipe(shareReplay(1))])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([timeChange, timeType]) => {
        if (!this.onChange) {
          return;
        }
        let { hours, minutes } = timeChange;
        if (timeType === TIME_TYPE.PM) {
          hours += TimeUtils.HOURS_ON_CLOCK;
        }

        this.onChange(this.timeConverter.getter({ hours, minutes }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(time: T) {
    let { hours, minutes } = this.timeConverter.setter(time);
    if (hours > TimeUtils.HOURS_ON_CLOCK) {
      this.timeType.setValue(TIME_TYPE.PM);
      hours -= TimeUtils.HOURS_ON_CLOCK;
    } else {
      this.timeType.setValue(TIME_TYPE.AM);
    }
    this.setTime$.next({ hours, minutes });
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}

  onTimeChange(time: ClockTime): void {
    this.timeChange$.next(time);
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
