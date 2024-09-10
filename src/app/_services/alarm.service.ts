import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserAlarm, UserAlarm } from '../_models/alarm/user-alarm';
import { CurrentConditions } from '../_models/weather/weather';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AlarmService {
  baseUrl = environment.apiUrl;
  userAlarms: WritableSignal<UserAlarm[]> = signal([]);
  activatedUserAlarms: Signal<UserAlarm[]> = computed(() =>
    this.filterAlarmsActivated(
      this.userAlarms(),
      this.weatherService.weatherData()?.currentConditions
    )
  );

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService
  ) {}

  addAlarm(userId: string, alarm: CreateUserAlarm) {
    return this.http.post(`${this.baseUrl}settings/${userId}/alarms`, alarm);
  }

  // Dohvatanje svih alarma korisnika
  getAlarmsApi(userId: string): Observable<UserAlarm[]> {
    return this.http.get<UserAlarm[]>(
      `${this.baseUrl}settings/${userId}/alarms`
    );
  }

  // Brisanje alarma korisnika
  deleteAlarm(userId: string, alarmId: number) {
    return this.http
      .delete(`${this.baseUrl}settings/${userId}/alarms/${alarmId}`)
      .subscribe((response) => {
        // alert('Alarm deleted!');
        this.userAlarms.update((userAlarms) =>
          userAlarms.filter((a) => a.id !== alarmId)
        );
      });
  }
  getAlarms() {
    return this.weatherService.weatherData()?.alerts ?? [];
  }

  loadAlarms(userId: string) {
    this.getAlarmsApi(userId || '').subscribe(
      (data: UserAlarm[]) => {
        this.userAlarms.set(data);
      },
      (error) => {
        console.error('Error loading alarms:', error);
      }
    );
  }

  filterAlarmsActivated(
    userAlarms: UserAlarm[],
    currentConditions: CurrentConditions | undefined
  ): UserAlarm[] {
    return userAlarms.filter((alarm) => {
      if (!currentConditions) return false;

      switch (alarm.type) {
        case 'rain':
          return alarm.conditions.precip <= currentConditions.precip;
        case 'thunderstorm':
          return (
            alarm.conditions.cloudcover <= currentConditions.cloudcover ||
            alarm.conditions.precip <= currentConditions.precip
          );
        case 'wind':
          return (
            alarm.conditions.windspeed <= currentConditions.windspeed ||
            alarm.conditions.windgust <= currentConditions.windgust
          );
        case 'snow':
          return (
            alarm.conditions.snow <= currentConditions.snow ||
            alarm.conditions.temp >= currentConditions.temp
          );
        case 'heat':
          return (
            alarm.conditions.temp <= currentConditions.temp ||
            alarm.conditions.uvIndex <= currentConditions.uvindex
          );
        default:
          return false;
      }
    });
  }
}
