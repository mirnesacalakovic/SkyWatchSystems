import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../_services/weather.service';
import { Day, Hour } from '../../_models/weather/weather';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-hourly',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.scss'
}) 
export class HourlyComponent {
  @Input() hourData: Hour | null = null;

  constructor(public weatherService: WeatherService) {}

  get getDays(): Day[] {
    // console.log(this.weatherService.weatherData()?.days ?? []);
    return this.weatherService.weatherData()?.days ?? [];
  }

  getDay(index: number) {
    return (new Date((this.weatherService.weatherData()?.days ?? [])[index].datetime))
  }
}


