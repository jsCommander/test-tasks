import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiMonitorWidgetComponent } from './ci-monitor-widget.component';
import { StatusCircleModule } from 'libs/angular-custom-controls/src/lib/ci-monitor-widget/status-circle/status-circle.module';

@NgModule({
  declarations: [CiMonitorWidgetComponent],
  imports: [CommonModule, StatusCircleModule],
  exports: [CiMonitorWidgetComponent],
})
export class CiMonitorWidgetModule {}
