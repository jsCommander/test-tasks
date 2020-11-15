import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from '@test-tasks/shared';
import { ClockExampleModule } from 'apps/angular-test-example/src/app/clock-example/clock-example.module';
import { ClockExampleComponent } from 'apps/angular-test-example/src/app/clock-example/clock-example.component';
import { CiWidgetExampleModule } from 'apps/angular-test-example/src/app/ci-widget-example/ci-widget-example.module';
import { CiWidgetExampleComponent } from 'apps/angular-test-example/src/app/ci-widget-example/ci-widget-example.component';

const routes: Routes = [
  {
    path: 'clock',
    component: ClockExampleComponent,
  },
  {
    path: 'ci-widget',
    component: CiWidgetExampleComponent,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled', useHash: true }),
    NavbarModule,
    ClockExampleModule,
    CiWidgetExampleModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
