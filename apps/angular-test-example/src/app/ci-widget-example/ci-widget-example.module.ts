import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiWidgetExampleComponent } from './ci-widget-example.component';
import { CiMonitorWidgetModule } from '@test-tasks/angular-custom-controls';

@NgModule({
  declarations: [CiWidgetExampleComponent],
  imports: [CommonModule, CiMonitorWidgetModule],
  exports: [CiWidgetExampleComponent],
})
export class CiWidgetExampleModule {}
