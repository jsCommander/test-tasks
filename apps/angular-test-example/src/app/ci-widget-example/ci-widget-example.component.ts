import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import {
  BuildData,
  CustomBuildMonitorConfig,
} from 'libs/angular-custom-controls/src/lib/ci-monitor-widget/ci-monitor-widget.interface';
import { interval, Observable, Subject } from 'rxjs';
import { map, scan, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { formatISO } from 'date-fns';
@Component({
  selector: 'ate-ci-widget-example',
  templateUrl: './ci-widget-example.component.html',
  styleUrls: ['./ci-widget-example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CiWidgetExampleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private fakeProjectIds = [1, 2, 3, 4, 5];
  private lastBuildStream$: Observable<BuildData> = this.getLastBuildStream(this.fakeProjectIds);

  readonly logBuildCount = 5;
  buildDataStream$: Observable<BuildData[]> = this.getBuildDataStream();
  lastBuildsForLog$: Observable<BuildData[]> = this.getBuildLogStream();

  customConfig: CustomBuildMonitorConfig = {
    projectIdBlacklist: [4],
  };

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getLastBuildStream(projectIds: number[]): Observable<BuildData> {
    const projectCount = projectIds.length;
    const dataDelay = 1000;

    return interval(dataDelay).pipe(
      map(() => {
        const projectId = projectIds[this.getRandomInt(projectCount)];
        return this.getBuild(projectId);
      }),
      shareReplay({ refCount: true, bufferSize: 1 }),
      takeUntil(this.destroy$)
    );
  }

  private getBuildDataStream(): Observable<BuildData[]> {
    const x: BuildData[] = [];
    return this.lastBuildStream$.pipe(
      scan((acc: BuildData[], curr) => {
        return [...acc, curr];
      }, []),
      shareReplay({ refCount: true, bufferSize: 1 }),
      takeUntil(this.destroy$)
    );
  }

  private getBuildLogStream(): Observable<BuildData[]> {
    return this.buildDataStream$.pipe(
      tap((x) => {
        console.warn('getBuildLogStream');
        console.warn(x);
      }),
      map((data) => {
        return data.slice(-this.logBuildCount, data.length).reverse();
      }),
      takeUntil(this.destroy$)
    );
  }

  private getBuild(projectId: number): BuildData {
    return {
      projectId,
      time: formatISO(new Date()),
      projectName: `project ${projectId}`,
      isSuccessBuild: Boolean(this.getRandomInt(2)),
    };
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
