import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { WeatherService } from '../../_services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { Day, Weather } from '../../_models/weather/weather';
import { TempChartComponent } from "../../_components/temp-chart/temp-chart.component";
import { ForecastChartComponent } from "../../_components/forecast-chart/forecast-chart.component";
import { DatePipe, DecimalPipe } from '@angular/common';
import { FooterComponent } from "../../_components/footer/footer.component";

@Component({
  selector: 'app-daily-details',
  standalone: true,
  imports: [
    TempChartComponent,
    ForecastChartComponent,
    DecimalPipe,
    DatePipe,
    FooterComponent
],
  templateUrl: './daily-details.component.html',
  styleUrl: './daily-details.component.scss'
})
export class DailyDetailsComponent implements OnInit{
  dailyData: WritableSignal<Day | null> = signal(null);
  constructor(private weatherService: WeatherService, private route: ActivatedRoute,) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Dohvata ID iz URL-a
    if (id !== null) {
      const index = Number(id); // Prevedi ID u broj jer se koristi za indeksiranje
      const daysData = this.weatherService.getDaysData();
      if (daysData[index]) {
        this.dailyData.set(daysData[index]); // Prikazuje podatke za određeni ID ako postoje
        console.log(this.dailyData())
      }
  }
}
}
