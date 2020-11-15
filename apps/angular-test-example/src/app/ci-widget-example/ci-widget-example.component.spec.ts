import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiWidgetExampleComponent } from './ci-widget-example.component';

describe('CiWidgetExampleComponent', () => {
  let component: CiWidgetExampleComponent;
  let fixture: ComponentFixture<CiWidgetExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiWidgetExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiWidgetExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
