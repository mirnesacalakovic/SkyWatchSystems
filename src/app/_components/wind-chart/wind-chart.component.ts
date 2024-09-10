import { Component, computed, Signal, ViewChild } from '@angular/core';
import { ChartData, ChartType, ChartEvent, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HistoryService } from '../../_services/history.service';

@Component({
  selector: 'app-wind-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './wind-chart.component.html',
  styleUrl: './wind-chart.component.scss'
})
export class WindChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartLabels: Signal<string[]> = computed(() => {
    return (
      this.historyService.historyData()?.days?.map((d) => d.datetime + ' ') ??
      []
    );
  });
  public barChartData: Signal<ChartData<'bar'>> = computed(() => {
    return {
      labels: this.barChartLabels(),
      datasets: [
        {
          data: [
            ...(this.historyService
              .historyData()
              ?.days?.map((d) => d.windspeed ?? 0) ?? []),
          ],
          label: 'Wind Speed',
        },
      ],
    };
  });
  constructor(private historyService: HistoryService) {
    
  }

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {},

    },
    plugins: {
      legend: { display: true },
    },
    responsive: true,
    maintainAspectRatio: false, 
  };

  public barChartType: ChartType = 'line';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }

}
