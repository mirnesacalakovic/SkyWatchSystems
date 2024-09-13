import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { History } from '../_models/history/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  historyData: WritableSignal<History | null> = signal(null);
  constructor(private httpClient: HttpClient) {}

  getHistoryData(location: string) {
    return this.httpClient.get<History>(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/last7days?unitGroup=metric&include=obs%2Cstats%2Cdays%2Calerts&key=${environment.weatherApiKey}&contentType=json`
    );
  }
}
