import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Hour, Weather } from '../_models/weather/weather';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherData: WritableSignal<Weather | null> = signal(null);

  constructor(private httpClient: HttpClient) {}

  getWeatherData(location: string) {
    this.httpClient
      .get<Weather>(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${environment.weatherApiKey}&contentType=json`
      )
      .subscribe((data) => {
        console.log(data);
        this.weatherData.set(data);
      });
  }

  getDaysData() {
    return this.weatherData()?.days ?? [];
  }

  getHourlyData() {
    const currentHour = new Date().getHours();

    const todayHours = this.weatherData()?.days[0].hours ?? [];
    const tomorrowHours = this.weatherData()?.days[1].hours ?? [];
    let resultHours: Hour[] = [];

    resultHours = [...todayHours.slice(currentHour)];

    if (resultHours.length < 24) {
      resultHours = [
        ...resultHours,
        ...tomorrowHours.slice(0, 24 - resultHours.length),
      ];
    }

    return resultHours;
  }
}
