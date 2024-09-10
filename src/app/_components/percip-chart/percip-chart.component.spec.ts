import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PercipChartComponent } from './percip-chart.component';

describe('PercipChartComponent', () => {
  let component: PercipChartComponent;
  let fixture: ComponentFixture<PercipChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercipChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercipChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
