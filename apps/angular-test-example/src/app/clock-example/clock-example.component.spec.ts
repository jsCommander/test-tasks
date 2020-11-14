import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockExampleComponent } from './clock-example.component';

describe('ClockExampleComponent', () => {
  let component: ClockExampleComponent;
  let fixture: ComponentFixture<ClockExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
