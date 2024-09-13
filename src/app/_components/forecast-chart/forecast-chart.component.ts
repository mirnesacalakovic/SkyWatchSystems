import { Component, computed, Input, input, Signal, ViewChild } from '@angular/core';
import { ChartData, ChartConfiguration, ChartType, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HistoryService } from '../../_services/history.service';
import { WeatherService } from '../../_services/weather.service';
import { Day } from '../../_models/weather/weather';

@Component({
  selector: 'app-forecast-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './forecast-chart.component.html',
  styleUrl: './forecast-chart.component.scss'
})
export class ForecastChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() index: number = 0;
  @Input() dailyData: Day | null = null;
  public barChartLabels: Signal<string[]> = computed(() => {
    if(this.dailyData != null) {
      return (
        this.dailyData.hours.map((d) => d.datetime.slice(0, 5) + ' ') ??
        []
      );
    }
    return [];
  });
  public barChartData: Signal<ChartData<'bar'>> = computed(() => {
    if(this.dailyData != null){
      return {
        labels: this.barChartLabels(),
        datasets: [
          {
            data: [
              ...(this.dailyData.hours.map((d) => d.temp ?? 0)),
            ],
            label: 'Temperature',
            borderColor: 'rgb(239, 246, 249)',
            backgroundColor: 'rgba(239, 246, 249, 0.8)',
          },
        ],
      };
    }
    return {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Temperature',
          borderColor: 'rgb(239, 246, 249)',
          backgroundColor: 'rgba(239, 246, 249, 0.8)',
        },
      ],
    };
  });
  constructor(private weatherService: WeatherService) {
    
  }

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(239, 246, 249, 0.2)', 
        },
        ticks: {
          color: 'rgb(239, 246, 249)', 
        },
      },
      y: {
        grid: {
          color: 'rgba(239, 246, 249, 0.2)', 
        },
        ticks: {
          color: 'rgb(239, 246, 249)',
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
            color: 'rgb(239, 246, 249)',
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
