import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavLink } from 'libs/shared/src/lib/shared/shared.interface';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() links: NavLink[] | null = [];
}
