export interface BuildData {
  projectId: number;
  time: string;
  projectName: string;
  isSuccessBuild: boolean;
}

export interface MappedBuildData {
  projectId: number;
  projectName: string;
  successBuildsPercent: number;
  latestBuilds: BuildData[];
}

export interface MonitorThreshold {
  color: string;
  threshold: number;
}

export interface BuildMonitorConfig {
  buildsLimitForProject: number;
  thresholds: MonitorThreshold[];
  projectIdBlacklist: number[];
}

export type CustomBuildMonitorConfig = Partial<BuildMonitorConfig>;
