import { ClockTime } from 'libs/angular-custom-controls/src/lib/clock-control/clock-svg/clock-svg.interface';

export interface CustomTimeConvertor<T> {
  setter: (value: T) => ClockTime;
  getter: (value: ClockTime) => T;
}

export enum TIME_TYPE {
  AM = 'AM',
  PM = 'PM',
}

export interface TimeType {
  type: TIME_TYPE;
  name: string;
}
