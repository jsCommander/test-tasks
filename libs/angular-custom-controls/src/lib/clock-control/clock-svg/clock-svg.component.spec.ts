import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockSvgComponent } from './clock-svg.component';

describe('ClockSvgComponent', () => {
  let component: ClockSvgComponent;
  let fixture: ComponentFixture<ClockSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
