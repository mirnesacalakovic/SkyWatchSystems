import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
  ViewChild,
} from '@angular/core';
import { HistoryService } from '../../_services/history.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-temp-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './temp-chart.component.html',
  styleUrl: './temp-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TempChartComponent {
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
              ?.days?.map((d) => d.tempmin ?? 0) ?? []),
          ],
          label: 'Min temperature',
        },
        {
          data: [
            ...(this.historyService
              .historyData()
              ?.days?.map((d) => d.feelslike ?? 0) ?? []),
          ],
          label: 'Feels like',
        },
        {
          data: [
            ...(this.historyService
              .historyData()
              ?.days?.map((d) => d.tempmax ?? 0) ?? []),
          ],
          label: 'Max temperature',
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
      x: {
        grid: {
          color: 'rgba(239, 246, 249, 0.2)', // Boja pomoćnih linija za x osu
        },
        ticks: {
          color: 'rgb(239, 246, 249)', // Boja teksta za x osu
        },
      },
      y: {
        grid: {
          color: 'rgba(239, 246, 249, 0.2)', // Boja pomoćnih linija za y osu
        },
        ticks: {
          color: 'rgb(239, 246, 249)', // Boja teksta za y osu
          callback: function(value: number | string) {
            return value + '°'; // Dodaje simbol ° uz vrednosti na Y osi
          }
        },
      },
    },
    plugins: {
      legend: { 
        display: true,
          labels: {
            color: 'rgb(239, 246, 249)', // Boja teksta za legendu (label dataset-a)
          }
       },
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
    this.barChartType = this.barChartType === 'line' ? 'bar' : 'line';
  }


}
