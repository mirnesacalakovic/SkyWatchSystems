import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowChartComponent } from './snow-chart.component';

describe('SnowChartComponent', () => {
  let component: SnowChartComponent;
  let fixture: ComponentFixture<SnowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnowChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
