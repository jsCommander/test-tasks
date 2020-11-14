export enum CLOCK_SELECT_TYPE {
  NONE,
  HOUR_ARM,
  MINUTE_ARM,
}

export enum CHANGE_TIME_TYPE {
  INCREMENT,
  DECREMENT,
}

export interface ClockTime {
  hours: number;
  minutes: number;
}
