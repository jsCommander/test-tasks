import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiMonitorWidgetComponent } from './ci-monitor-widget.component';

describe('CiMonitorWidgetComponent', () => {
  let component: CiMonitorWidgetComponent;
  let fixture: ComponentFixture<CiMonitorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiMonitorWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiMonitorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
