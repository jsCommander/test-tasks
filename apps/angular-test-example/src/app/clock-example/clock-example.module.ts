import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockExampleComponent } from './clock-example.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ClockControlModule } from '@test-tasks/angular-custom-controls';

const routes: Routes = [{ path: '', component: ClockExampleComponent }];

@NgModule({
  declarations: [ClockExampleComponent],
  imports: [RouterModule.forChild(routes), CommonModule, ClockControlModule, ReactiveFormsModule],
})
export class ClockExampleModule {}
