import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvIndexChartComponent } from './uv-index-chart.component';

describe('UvIndexChartComponent', () => {
  let component: UvIndexChartComponent;
  let fixture: ComponentFixture<UvIndexChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UvIndexChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UvIndexChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
