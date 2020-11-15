import { Component } from '@angular/core';
import { NavLink } from '@test-tasks/shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  caption: string = 'Test tasks';
  links$ = new BehaviorSubject<NavLink[]>([
    {
      path: 'clock',
      name: 'Analog clock control',
    },
    {
      path: 'ci-widget',
      name: 'Build monitor widget',
    },
  ]);
}
