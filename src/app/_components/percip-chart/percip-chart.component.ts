import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HistoryService } from '../../_services/history.service';

@Component({
  selector: 'app-percip-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './percip-chart.component.html',
  styleUrl: './percip-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercipChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartLabels: Signal<string[]> = computed(() => {
    return (
      this.historyService.historyData()?.days?.map((d) => d.datetime + ' ') ??
      []
    );
  });
  public barChartData: Signal<ChartData<'bar'>> = computed(() => {
    // console.log(this.historyService.historyData())
    return {
      labels: this.barChartLabels(),
      datasets: [
        {
          data: [
            ...(this.historyService
              .historyData()
              ?.days?.map((d) => d.normal.precip[0] ?? 0) ?? []),
          ],
          label: 'Min percipation',
        },
        {
          data: [
            ...(this.historyService
              .historyData()
              ?.days?.map((d) => d.normal.precip[1] ?? 0) ?? []),
          ],
          label: 'Avg percipation',
        },
        {
          data: [
            ...(this.historyService
              .historyData()
              ?.days?.map((d) => d.normal.precip[2] ?? 0) ?? []),
          ],
          label: 'Max percipation',
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

  public barChartType: ChartType = 'bar';

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

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
