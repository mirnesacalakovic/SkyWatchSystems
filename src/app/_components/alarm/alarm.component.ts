import { Component, computed, Input, Renderer2, Signal } from '@angular/core';
import { Alert } from '../../_models/weather/weather';
import { AlarmService } from '../../_services/alarm.service';
import { WeatherService } from '../../_services/weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alarm',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.scss',
})
export class AlarmComponent {

  alarms: Signal<Alert[]> = computed(
    () => this.weatherService.weatherData()?.alerts ?? []
  );

  constructor(
    private alarmService: AlarmService,
    private weatherService: WeatherService,
    private renderer: Renderer2
  ) {}

  checkRed(_t2: Alert) {
    return _t2.event.toLowerCase().includes("red")
  }
  checkOrange(_t2: Alert) {
    return _t2.event.toLowerCase().includes("orange")
  }
  checkYellow(_t2: Alert) {
    return _t2.event.toLowerCase().includes("yellow")
  }
}
