import { Component, computed, Signal } from '@angular/core';
import { ChartData, ChartType, ChartEvent, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HistoryService } from '../../_services/history.service';

@Component({
  selector: 'app-cloud-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cloud-chart.component.html',
  styleUrl: './cloud-chart.component.scss'
})
export class CloudChartComponent {
  public radarChartOptions: ChartConfiguration['options'] = {};
  constructor(private historyService: HistoryService) {}

  public radarChartLabels: Signal<string[]> = computed( () => { 
    return (
      this.historyService.historyData()?.days.map((d) => d.datetime + ' ') ?? []
    );
  });

  public radarChartData: Signal<ChartData<'radar'>> = computed( () => {
    return {
      labels: this.radarChartLabels(),
      datasets: [
        {
          data: [
            ...(this.historyService
              .historyData()
              ?.days?.map((d) => d.cloudcover ?? 0) ?? [])
          ],
          label: 'Cloud cover',
          backgroundColor: 'rgba(255,99,132,0.6)'
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
