import { Component, Input, Renderer2 } from '@angular/core';
import { WeatherService } from '../../_services/weather.service';
import { Day } from '../../_models/weather/weather';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss'
})
export class DailyComponent {

  @Input() dailyData: Day | null = null;
  
  constructor(public weatherService: WeatherService, private renderer: Renderer2) {}

  get getDays(): Day[] {
    return this.weatherService.weatherData()?.days ?? [];
  }

  get dateToObj() {
    return new Date(this.dailyData?.datetime ?? "");
  }

  get todaysDate() {
    if(new Date().getDate() == this.dateToObj.getDate())
      return true;
    return false;
  }

  addClass() {
    if (typeof document !== 'undefined') {
      const card = document.getElementById("daily-card");
      this.renderer.addClass(card, 'change-background');
    }
  }
}
