import { Component, signal, WritableSignal } from '@angular/core';
import { MapComponent } from '../../_components/map/map.component';
import { LocationService } from '../../_services/location.service';
import { AutocompleteResult } from '../../_models/location/autocomplete';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { WeatherService } from '../../_services/weather.service';
import { Station } from '../../_models/weather/weather';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-technical-dashboard',
  standalone: true,
  imports: [MapComponent, FormsModule, NgFor, NgIf, DecimalPipe],
  templateUrl: './technical-dashboard.component.html',
  styleUrl: './technical-dashboard.component.scss',
})
export class TechnicalDashboardComponent {
  public toggle = false;
  locationQuery = '';
  changeBlocker: WritableSignal<boolean> = signal(false);
  location: WritableSignal<Location | null> = signal(null);

  constructor(
    private authService: AuthService,
    public locationService: LocationService,
    public weatherService: WeatherService
  ) {}

  callForAutocomplete() {
    if (this.locationQuery.trim().length > 0 && !this.changeBlocker()) {
      this.changeBlocker.set(true);
      setTimeout(() => {
        this.locationService.getLocationAutocomplete(this.locationQuery.trim());
        this.changeBlocker.set(false);
      }, 1000);
    }
  }
  get autocompleteResults(): AutocompleteResult[] {
    return this.locationService.autocompleteResult();
  }

  locationSelected(autocompleteResult: AutocompleteResult) {
    if (this.locationQuery.trim().length > 0) {
      this.locationQuery = `${autocompleteResult.city}, ${autocompleteResult.country}`;
      this.locationService.autocompleteResult.set([]);
      this.toggle = true;
      this.weatherService.getWeatherData(this.locationQuery);
    }
  }

  get stations(): Station[] {
    const weatherData = this.weatherService.weatherData();
    if (!weatherData) return [];
    return Object.values(weatherData.stations) as Station[];
  }

  logout() {
    this.authService.logout();
  }
}
