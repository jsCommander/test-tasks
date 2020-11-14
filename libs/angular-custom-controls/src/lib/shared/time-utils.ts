export class TimeUtils {
  static readonly MINUTES_ON_CLOCK = 60;
  static readonly HOURS_ON_CLOCK = 12;
  private static readonly DEGREES_IN_CIRCLE = 360;

  static convertHourToDegrees(hours: number): number {
    const degrees = hours * (TimeUtils.DEGREES_IN_CIRCLE / TimeUtils.HOURS_ON_CLOCK);
    return Math.round(TimeUtils.normalizeDegrees(degrees));
  }

  static convertMinutesToDegrees(minutes: number): number {
    const degrees = minutes * (TimeUtils.DEGREES_IN_CIRCLE / TimeUtils.MINUTES_ON_CLOCK);
    return Math.round(TimeUtils.normalizeDegrees(degrees));
  }

  private static normalizeDegrees(degrees: number): number {
    while (degrees - TimeUtils.DEGREES_IN_CIRCLE > 0) {
      degrees = degrees - TimeUtils.DEGREES_IN_CIRCLE;
    }
    return degrees;
  }
}
