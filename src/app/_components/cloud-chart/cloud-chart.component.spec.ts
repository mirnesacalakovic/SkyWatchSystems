import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudChartComponent } from './cloud-chart.component';

describe('CloudChartComponent', () => {
  let component: CloudChartComponent;
  let fixture: ComponentFixture<CloudChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
