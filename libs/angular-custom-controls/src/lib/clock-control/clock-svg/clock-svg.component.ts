import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  HostListener,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  ClockTime,
  CLOCK_SELECT_TYPE,
} from 'libs/angular-custom-controls/src/lib/clock-control/clock-svg/clock-svg.interface';
import { TimeUtils } from 'libs/angular-custom-controls/src/lib/shared/time-utils';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, map, withLatestFrom, filter } from 'rxjs/operators';

@Component({
  selector: 'jsc-clock-svg',
  templateUrl: './clock-svg.component.html',
  styleUrls: ['./clock-svg.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockSvgComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() set time(value: ClockTime | null) {
    if (value) {
      this.clockTime$.next(value);
    }
  }
  @Output() onTimeChange = new EventEmitter<ClockTime>();

  @ViewChild('container', { static: true }) container: ElementRef | null = null;

  CLOCK_SELECT_TYPE = CLOCK_SELECT_TYPE;

  selectedArm$ = new BehaviorSubject<CLOCK_SELECT_TYPE>(CLOCK_SELECT_TYPE.NONE);
  hourArmTransform$: Observable<string>;
  minuteArmTransform$: Observable<string>;

  private changeTime$ = new Subject<number>();
  private clockTime$ = new BehaviorSubject<ClockTime>({ hours: 0, minutes: 0 });
  private destroy$ = new Subject();

  private readonly MAX_HOURS = TimeUtils.HOURS_ON_CLOCK;
  private readonly MAX_MINUTES = TimeUtils.MINUTES_ON_CLOCK;

  constructor() {
    this.hourArmTransform$ = this.getHourArmTransform();
    this.minuteArmTransform$ = this.getMinuteArmTransform();
  }

  ngOnInit(): void {
    this.getChangeTimeStream().subscribe((time) => {
      this.clockTime$.next(time);
    });

    this.clockTime$.pipe(takeUntil(this.destroy$)).subscribe((time) => {
      this.onTimeChange.emit(time);
    });
  }

  ngAfterViewInit() {
    if (!this.container?.nativeElement) {
      throw new Error("Can't find container element");
    }
    const keydownEvent$ = fromEvent<KeyboardEvent>(this.container.nativeElement, 'keydown');
    const wheelEvent$ = fromEvent<WheelEvent>(this.container.nativeElement, 'wheel');

    keydownEvent$.pipe(takeUntil(this.destroy$)).subscribe((keydownEvent) => {
      this.handleKeyBoardEvent(keydownEvent);
    });

    wheelEvent$.pipe(takeUntil(this.destroy$)).subscribe((wheelEvent) => {
      this.handleWheelEvent(wheelEvent);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleKeyBoardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.changeTime$.next(1);
    }

    if (event.key === 'ArrowDown') {
      this.changeTime$.next(-1);
    }
  }

  handleWheelEvent(event: WheelEvent) {
    this.changeTime$.next(event.deltaY > 0 ? -1 : 1);
  }

  setSelected(type: CLOCK_SELECT_TYPE, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedArm$.next(type);
  }

  private getHourArmTransform(): Observable<string> {
    return this.clockTime$.pipe(
      map((time) => time.hours),
      map((hours) => {
        return TimeUtils.convertHourToDegrees(hours);
      }),
      map((angle) => {
        return this.getRotateTransformStyle(angle);
      }),
      takeUntil(this.destroy$)
    );
  }

  private getMinuteArmTransform(): Observable<string> {
    return this.clockTime$.pipe(
      map((time) => time.minutes),
      map((minutes) => {
        return TimeUtils.convertMinutesToDegrees(minutes);
      }),
      map((angle) => {
        return this.getRotateTransformStyle(angle);
      }),
      takeUntil(this.destroy$)
    );
  }

  private getRotateTransformStyle(angle: number): string {
    return `rotate(${angle}deg)`;
  }

  private getChangeTimeStream(): Observable<ClockTime> {
    return this.changeTime$.pipe(
      withLatestFrom(this.selectedArm$, this.clockTime$),
      filter(([, selectedArm]) => {
        return selectedArm !== CLOCK_SELECT_TYPE.NONE;
      }),
      map(([value, selectedArm, clockTime]) => {
        return this.changeTime(clockTime, value, selectedArm);
      }),
      takeUntil(this.destroy$)
    );
  }

  private changeTime(currentTime: ClockTime, diff: number, selectedArm: CLOCK_SELECT_TYPE): ClockTime {
    let { hours, minutes } = currentTime;

    if (selectedArm === CLOCK_SELECT_TYPE.HOUR_ARM) {
      hours += diff;
    }

    if (selectedArm === CLOCK_SELECT_TYPE.MINUTE_ARM) {
      minutes += diff;
    }

    return this.normalizeTime({
      hours,
      minutes,
    });
  }

  private normalizeTime(time: ClockTime): ClockTime {
    let { hours, minutes } = time;

    while (minutes >= this.MAX_MINUTES) {
      hours += 1;
      minutes -= this.MAX_MINUTES;
    }

    while (minutes < 0) {
      hours -= 1;
      minutes += this.MAX_MINUTES;
    }

    while (hours >= this.MAX_HOURS) {
      hours -= this.MAX_HOURS;
    }

    while (hours < 0) {
      hours += this.MAX_HOURS;
    }

    return {
      hours,
      minutes,
    };
  }
}
