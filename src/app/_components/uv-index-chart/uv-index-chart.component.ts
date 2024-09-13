import { Component, computed, Signal, ViewChild } from '@angular/core';
import { ChartData, ChartType, ChartEvent, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HistoryService } from '../../_services/history.service';

@Component({
  selector: 'app-uv-index-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './uv-index-chart.component.html',
  styleUrl: './uv-index-chart.component.scss'
})
export class UvIndexChartComponent {
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
              ?.days?.map((d) => d.uvindex ?? 0) ?? []),
          ],
          label: 'UV Index',
          borderColor: 'rgba(155,199,162,0.6)'
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
        min: 0,
        grid: {
          color: 'rgba(239, 246, 249, 0.2)', // Boja pomoćnih linija za y osu
        },
        ticks: {
          color: 'rgb(239, 246, 249)', // Boja teksta za y osu
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
