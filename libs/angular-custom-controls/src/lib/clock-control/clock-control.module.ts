import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClockSvgModule } from 'libs/angular-custom-controls/src/lib/clock-control/clock-svg/clock-svg.module';
import { ClockControlComponent } from './clock-control.component';

@NgModule({
  declarations: [ClockControlComponent],
  imports: [CommonModule, ClockSvgModule, ReactiveFormsModule],
  exports: [ClockControlComponent],
})
export class ClockControlModule {}
