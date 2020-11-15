import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import {
  BuildData,
  BuildMonitorConfig,
  CustomBuildMonitorConfig,
  MappedBuildData,
  MonitorThreshold,
} from 'libs/angular-custom-controls/src/lib/ci-monitor-widget/ci-monitor-widget.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { compareAsc } from 'date-fns';

@Component({
  selector: 'jsc-ci-monitor-widget',
  templateUrl: './ci-monitor-widget.component.html',
  styleUrls: ['./ci-monitor-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CiMonitorWidgetComponent implements OnInit, OnDestroy {
  @Input() set buildData(value: BuildData[] | null) {
    if (value) {
      this.buildData$.next(value);
    }
  }
  @Input() caption: string = 'Builds monitor';
  @Input() set customConfig(value: CustomBuildMonitorConfig) {
    this.config = Object.assign({}, this.getDefaultConfig(), value);
    this.config.thresholds = this.sortThresholds(this.config.thresholds);
  }
  private buildData$ = new BehaviorSubject<BuildData[]>([]);
  private destroy$ = new Subject<void>();

  private config: BuildMonitorConfig = this.getDefaultConfig();

  mappedBuildData$: Observable<MappedBuildData[]> = this.getMappedProjectStream();

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackBy(index: number, buildData: MappedBuildData): number {
    return buildData.projectId;
  }

  getStatusColor(successBuildsPercent: number): string | null {
    const color = this.config.thresholds.reduce((acc: string | null, item) => {
      if (successBuildsPercent >= item.threshold) {
        return item.color;
      }
      return acc;
    }, null);

    return color;
  }

  private getMappedProjectStream(): Observable<MappedBuildData[]> {
    return this.buildData$.pipe(
      map((data) => {
        return this.getProjectMap(data);
      }),
      map((projectMap) => {
        return this.getMappedBuildData(projectMap);
      }),
      takeUntil(this.destroy$)
    );
  }

  private getProjectMap(buildData: BuildData[]): Record<number, BuildData[]> {
    return buildData.reduce((acc: Record<number, BuildData[]>, item) => {
      const isBannedProject = this.config.projectIdBlacklist.includes(item.projectId);
      if (isBannedProject) {
        return acc;
      }

      let projectBuilds = acc[item.projectId];

      if (!projectBuilds) {
        projectBuilds = [];
        acc[item.projectId] = projectBuilds;
      }

      projectBuilds.push(item);

      return acc;
    }, {});
  }

  private getMappedBuildData(projectMap: Record<number, BuildData[]>): MappedBuildData[] {
    return Object.values(projectMap).map((projectsBuilds) => {
      const { projectId, projectName } = projectsBuilds?.[0];

      const latestBuilds = projectsBuilds
        .sort((a, b) => compareAsc(new Date(a.time), new Date(b.time)))
        .slice(-this.config.buildsLimitForProject, projectsBuilds.length);

      const mappedData: MappedBuildData = {
        projectId,
        projectName,
        latestBuilds,
        successBuildsPercent: this.calculateSuccessPercent(latestBuilds),
      };

      return mappedData;
    });
  }

  private calculateSuccessPercent(data: BuildData[]): number {
    const successBuildCount = data.reduce((acc: number, item) => {
      return item.isSuccessBuild ? acc + 1 : acc;
    }, 0);
    return Math.round((100 * successBuildCount) / data.length);
  }

  private getDefaultConfig(): BuildMonitorConfig {
    return {
      buildsLimitForProject: 10,
      projectIdBlacklist: [],
      thresholds: this.sortThresholds([
        {
          color: 'red',
          threshold: 0,
        },
        {
          color: 'yellow',
          threshold: 45,
        },
        {
          color: 'green',
          threshold: 80,
        },
      ]),
    };
  }

  private sortThresholds(thresholds: MonitorThreshold[]): MonitorThreshold[] {
    return [...thresholds].sort((a, b) => {
      return a.threshold - b.threshold;
    });
  }
}
