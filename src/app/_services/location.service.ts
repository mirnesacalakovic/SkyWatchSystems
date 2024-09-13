import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Location } from '../_models/location/location';
import { WeatherService } from './weather.service';
import {
  AutocompleteApiResponse,
  AutocompleteResult,
} from '../_models/location/autocomplete';
import { environment } from '../../environments/environment';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  latitude: WritableSignal<number> = signal(59.9123);
  longitude: WritableSignal<number> = signal(10.75);
  location: WritableSignal<Location | null> = signal(null);
  autocompleteResult: WritableSignal<AutocompleteResult[]> = signal([]);

  constructor(
    private httpClient: HttpClient,
    private weatherService: WeatherService,
    private alertService: TuiAlertService
  ) {}

  getLocationAutocomplete(query: string) {
    this.httpClient
      .get<AutocompleteApiResponse>(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&format=json&apiKey=${environment.locationApiKey}`
      )
      .subscribe({
        next: (result) => {
          this.autocompleteResult.set(result.results);
        },
        error: (error) => {
          console.log(error);
          this.alertService.open('Error while searching a city', {
            label: 'Error!',
            appearance: 'error',
            autoClose: 3000,
          });
        },
      });
  }

  getLatAndLog(): void {
    this.getLocation(this.longitude(), this.latitude());
    if (typeof navigator !== 'undefined') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude.set(position.coords.latitude);
          this.longitude.set(position.coords.longitude);
          this.getLocation(this.longitude(), this.latitude());
          console.log('Lat i log', [this.longitude(), this.latitude()]);
        });
      } else {
        console.log('No support for geolocation');
      }
    }
  }

  getLocation(longitude: number, latitude: number) {
    this.httpClient
      .get<Location>(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${environment.locationApiKey}`
      )
      .subscribe((data) => {
        console.log(data.features[0].properties.formatted);
        this.location.set(data);
        this.weatherService.getWeatherData(
          `${data.features[0].properties.city}, ${data.features[0].properties.country}`
        );
      });
  }
}
