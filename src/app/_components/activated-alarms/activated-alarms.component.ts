import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../_services/alarm.service';
import { WeatherService } from '../../_services/weather.service';
import { AuthService } from '../../_services/auth.service';
import { UserAlarm } from '../../_models/alarm/user-alarm';

@Component({
  selector: 'app-activated-alarms',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './activated-alarms.component.html',
  styleUrl: './activated-alarms.component.scss',
})
export class ActivatedAlarmsComponent implements OnInit {
  constructor(
    private alarmService: AlarmService,
    private authService: AuthService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.currentUser()?.id;
    console.log(
      'DEBUG: ',
      this.weatherService.weatherData()?.currentConditions
    );
    if (userId) {
      this.alarmService.loadAlarms(userId);
    } else {
      // Optional: Handle the case where the user ID is undefined
      console.error('User ID is undefined, cannot delete alarm.');
    }
  }

  getFilteredConditions(conditions: any): { key: string; value: number }[] {
    return Object.keys(conditions)
      .filter((key) => key !== 'id' && conditions[key] != 0) // Filtriraj da nije 'id' i da je vrednost > 0
      .map((key) => ({ key, value: conditions[key] }));
  }

  deleteAlarmAction(alarmId: number) {
    const userId = this.authService.currentUser()?.id;
    if (userId) {
      this.alarmService.deleteAlarm(userId, alarmId);
    } else {
      // Optional: Handle the case where the user ID is undefined
      console.error('User ID is undefined, cannot delete alarm.');
    }
  }

  get activatedAlarms(): UserAlarm[] {
    return this.alarmService.activatedUserAlarms();
  }
}
