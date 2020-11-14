import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ClockControlModule } from '@test-tasks/angular-custom-controls';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    ClockControlModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
