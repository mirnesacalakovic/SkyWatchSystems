import { Component, computed, Signal } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HistoryService } from '../../_services/history.service';
@Component({
  selector: 'app-humidity-chart',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './humidity-chart.component.html',
  styleUrl: './humidity-chart.component.scss'
})
export class HumidityChartComponent {
  public radarChartOptions: ChartConfiguration['options'] = {};
  constructor(private historyService: HistoryService){}
  
  public radarChartLabels: Signal<string[]> = computed(() => {
    return (
      this.historyService.historyData()?.days?.map((d) => d.datetime + ' ') ??
      []
    );
  });

  public radarChartData: Signal<ChartData<'radar'>> = computed( () => {
    return {
      labels: this.radarChartLabels(),
      datasets: [
        { data: [
          ...(this.historyService
            .historyData()
            ?.days?.map((d) => d.humidity ?? 0) ?? [])
          ],
          label: 'Humidity', 
        },
      ],
    }
  });
  public radarChartType: ChartType = 'radar';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    // console.log(event, active);
  }
}
