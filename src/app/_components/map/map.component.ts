import {
  Component,
  computed,
  effect,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import { WeatherService } from '../../_services/weather.service';
import { Weather } from '../../_models/weather/weather';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  map: WritableSignal<Leaflet.Map | null> = signal(null);
  options: Signal<Leaflet.MapOptions> = computed(() => {
    const weatherData = this.weatherService.weatherData();
    return {
      layers: getLayers(weatherData),
      zoom: 9,
      center: weatherData
        ? new Leaflet.LatLng(weatherData.latitude, weatherData.longitude)
        : new Leaflet.LatLng(43.530147, 16.488932),
    };
  });

  constructor(public weatherService: WeatherService) {
    effect(() => {
      const weatherData = this.weatherService.weatherData();
      if (weatherData) {
        this.changeView(weatherData);
      }
    });
  }

  onMapReady($event: Leaflet.Map) {
    this.map.set($event);
  }

  changeView(weatherData: Weather) {
    this.map()?.options.layers?.forEach((l) => {
      if (l instanceof Leaflet.Marker) {
        this.map()?.removeLayer(l);
      }
    });
    getMarkers(weatherData).forEach((m) => {
      this.map()?.addLayer(m);
    });
    this.map()?.panTo(
      new Leaflet.LatLng(weatherData.latitude, weatherData.longitude)
    );
  }

  getOptions() {
    const weatherData = this.weatherService.weatherData();
    return {
      layers: getLayers(weatherData),
      zoom: 9,
      center: weatherData
        ? new Leaflet.LatLng(weatherData.latitude, weatherData.longitude)
        : new Leaflet.LatLng(43.530147, 16.488932),
    };
  }
}

export const getLayers = (weatherData: Weather | null): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
      } as Leaflet.TileLayerOptions
    ),
    ...getMarkers(weatherData),
  ] as Leaflet.Layer[];
};

export const getMarkers = (weatherData: Weather | null): Leaflet.Marker[] => {
  if (!weatherData) return [];
  return [
    ...Object.values(weatherData.stations).flatMap(
      (s) =>
        new Leaflet.Marker(new Leaflet.LatLng(s.latitude, s.longitude), {
          icon: new Leaflet.Icon({
            iconSize: [45, 45],
            iconAnchor: [13, 41],
            iconUrl: 'assets/icons/icons2/station.png',
          }),
          title: s.name,
        } as Leaflet.MarkerOptions)
    ),
    new Leaflet.Marker(
      new Leaflet.LatLng(weatherData.latitude, weatherData.longitude),
      {
        icon: new Leaflet.Icon({
          iconSize: [45, 45],
          iconAnchor: [13, 41],
          iconUrl: 'assets/icons/icons2/location.png',
        }),
        title: weatherData.address,
      } as Leaflet.MarkerOptions
    ),
  ] as Leaflet.Marker[];
};
