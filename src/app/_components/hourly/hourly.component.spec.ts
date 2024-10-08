import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyComponent } from './hourly.component';

describe('HourlyComponent', () => {
  let component: HourlyComponent;
  let fixture: ComponentFixture<HourlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
