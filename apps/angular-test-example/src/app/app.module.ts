import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '@test-tasks/shared';
import { ClockExampleModule } from 'apps/angular-test-example/src/app/clock-example/clock-example.module';
import { ClockExampleComponent } from 'apps/angular-test-example/src/app/clock-example/clock-example.component';

const routes: Routes = [
  {
    path: 'clock',
    component: ClockExampleComponent,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled', useHash: true }),
    NavbarModule,
    ClockExampleModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
