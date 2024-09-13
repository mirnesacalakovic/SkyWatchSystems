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
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: { // 'r' je korišćen za radijalne osi u radar chartu
        grid: {
          color: 'rgba(239, 246, 249, 0.2)', // Boja pomoćnih linija (grid)
        },
        angleLines: {
          color: 'rgba(239, 246, 249, 0.2)', // Boja uglovnih linija (linije od centra do rubova)
        },
        pointLabels: {
          color: 'rgb(239, 246, 249)', // Boja tekstova (labela) oko grafikona
        },
        ticks: {
          color: 'rgb(110, 110, 110)', // Boja tick oznaka (brojeva na radijalnim linijama)
          callback: function(value: number | string) {
            return value + '%'; // Dodaje simbol ° uz vrednosti na Y osi
          }  
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgb(239, 246, 249)', // Boja tekstova u legendi (label dataset-a)
        },
      },
    },
  };
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
