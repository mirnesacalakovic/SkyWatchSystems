import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { WeatherService } from '../../_services/weather.service';
import { LocationService } from '../../_services/location.service';
import { CurrentConditions, Day, Weather } from '../../_models/weather/weather';
import {
  DatePipe,
  DecimalPipe,
  JsonPipe,
  NgClass,
  NgFor,
  NgIf,
} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HourlyComponent } from '../../_components/hourly/hourly.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  viewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { DailyComponent } from '../../_components/daily/daily.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteResult } from '../../_models/location/autocomplete';
import { AuthService } from '../../_services/auth.service';
import { TooltipModule } from 'primeng/tooltip';
import { AlarmService } from '../../_services/alarm.service';
import { AlarmComponent } from '../../_components/alarm/alarm.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {
  CreateUserAlarm,
  UserAlarm,
  UserAlarmConditions,
} from '../../_models/alarm/user-alarm';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ActivatedAlarmsComponent } from '../../_components/activated-alarms/activated-alarms.component';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from "../../_components/footer/footer.component";

interface SwiperNativeEl {
  swiper: Swiper;
  initialize: () => void;
}

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
    RouterLink,
    HourlyComponent,
    DailyComponent,
    FormsModule,
    TooltipModule,
    AlarmComponent,
    DialogModule,
    ButtonModule,
    NgIf,
    NgFor,
    JsonPipe,
    DashboardComponent,
    NgClass,
    ActivatedAlarmsComponent,
    FooterComponent
],
  providers: [DatePipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeatherComponent implements OnInit {
  private readonly swiperContainer =
    viewChild.required<ElementRef<SwiperNativeEl>>('swiperContainer');
  locationQuery = '';
  changeBlocker: WritableSignal<boolean> = signal(false);
  visible: boolean = false;
  visible2: boolean = false;
  selected: string = 'thunderstorm';

  thunderstorm: UserAlarmConditions = {
    precip: 0,
    cloudcover: 0,
    id: 0,
    temp: 0,
    uvIndex: 0,
    snow: 0,
    windspeed: 0,
    windgust: 0,
  };
  rain: UserAlarmConditions = {
    precip: 0,
    id: 0,
    cloudcover: 0,
    temp: 0,
    uvIndex: 0,
    snow: 0,
    windspeed: 0,
    windgust: 0,
  };
  heat: UserAlarmConditions = {
    temp: 0,
    uvIndex: 0,
    id: 0,
    precip: 0,
    cloudcover: 0,
    snow: 0,
    windspeed: 0,
    windgust: 0,
  };
  snow: UserAlarmConditions = {
    snow: 0,
    temp: -1,
    id: 0,
    precip: 0,
    cloudcover: 0,
    uvIndex: 0,
    windspeed: 0,
    windgust: 0,
  };
  wind: UserAlarmConditions = {
    windspeed: 0,
    windgust: 0,
    id: 0,
    precip: 0,
    cloudcover: 0,
    temp: 0,
    uvIndex: 0,
    snow: 0,
  };

  ngOnInit(): void {
    this.locationService.getLatAndLog();
  }
  showDialog() {
    this.visible = true;
  }
  showDialog2() {
    this.visible2 = true;
  }
  constructor(
    public weatherService: WeatherService,
    public locationService: LocationService,
    public authService: AuthService,
    public alarmService: AlarmService,
    public router: Router,
    private renderer: Renderer2,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    effect(() => {
      const swiperEl = this.swiperContainer().nativeElement;

      const swiperParams: SwiperOptions = {
        breakpoints: {
          200: {
            slidesPerView: 1,
          },
          300: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
            speed: 10,
          },
          800: {
            slidesPerView: 4,
            speed: 10,
          },
          900: {
            slidesPerView: 4,
            speed: 10,
          },
          1024: {
            followFinger: false,
            speed: 0,
            slidesPerView: 5,
          },
        },
        hashNavigation: true,
        history: true,
        injectStyles: [
          `
          .swiper-button-next {
            color: white;
            height: 30px;
            margin-left: 3em;
            
          }
          .swiper-button-prev {
            color: white;
            height: 30px;
          }
            .swiper-button-next:hover {
            color: gray;
          }
          .swiper-button-prev:hover{
            color: gray;
          }
          
          `,
        ],
        initialSlide: 1,
        keyboard: {
          enabled: true,
        },
        loop: false,
        navigation: {
          enabled: true,
        },
        roundLengths: true,
        slidesPerView: 5,
        zoom: true,
      };
      if (swiperEl && swiperEl.initialize) {
        Object.assign(swiperEl, swiperParams);
        swiperEl.initialize();
      } else {
        console.error(
          'Swiper element not properly initialized or method not found.'
        );
      }
    });
  }

  get autocompleteResults(): AutocompleteResult[] {
    return this.locationService.autocompleteResult();
  }

  get locationCountry(): string | undefined {
    return this.locationService.location()?.features[0].properties.country;
  }

  get locationCity(): string | undefined {
    return this.locationService.location()?.features[0].properties.city;
  }

  get address() {
    return this.weatherService.weatherData()?.address;
  }

  get currentData(): CurrentConditions | undefined {
    return this.weatherService.weatherData()?.currentConditions;
  }

  get infoData(): Weather | null {
    return this.weatherService.weatherData();
  }
  get getDays(): Day[] {
    return this.weatherService.weatherData()?.days ?? [];
  }

  get currentTime() {
    return this.weatherService
      .weatherData()
      ?.currentConditions.datetime.slice(0, -3);
  }
  get currentDate() {
    return new Date(
      this.weatherService.weatherData()?.days[0]?.datetime ?? ''
    ).toLocaleDateString();
  }

  get currentUser() {
    return this.authService.currentUser();
  }

  get alarms(): UserAlarm[] {
    return this.alarmService.userAlarms();
  }

  get activatedAlarms(): UserAlarm[] {
    return this.alarmService.activatedUserAlarms();
  }

  saveAlarm(alarmType: string) {
    let conditions: UserAlarmConditions;

    // Odredite koje podatke koristiti na osnovu tipa alarma
    switch (alarmType) {
      case 'wind':
        conditions = this.wind;
        break;
      case 'rain':
        conditions = this.rain;
        break;
      case 'heat':
        conditions = this.heat;
        break;
      case 'thunderstorm':
        conditions = this.thunderstorm;
        break;
      case 'snow':
        conditions = this.snow;
        break;
      default:
        alert('Unknown alarm type');
        return;
    }

    const alarm: CreateUserAlarm = {
      type: alarmType,
      conditions: conditions,
      userId: this.currentUser?.id ?? '',
    };

    this.alarmService
      .addAlarm(this.currentUser?.id || '', alarm)
      .subscribe((response) => {
        // alert(`${alarmType.charAt(0).toUpperCase() + alarmType.slice(1)} alarm saved!`);
        if (this.currentUser) this.alarmService.loadAlarms(this.currentUser.id);
        this.toastr.success('You created a custom alarm successfully!');
        this.visible = false;
      });
  }

  getFilteredConditions(conditions: any): { key: string; value: number }[] {
    return Object.keys(conditions)
      .filter((key) => key !== 'id' && conditions[key] != 0) // Filtriraj da nije 'id' i da je vrednost > 0
      .map((key) => ({ key, value: conditions[key] }));
  }

  onSelect(option: string) {
    this.selected = option;
  }

  logout() {
    this.authService.logout();
  }

  localStorageCheck() {
    if (localStorage.getItem('user') !== null) {
      return true;
    }
    return false;
  }

  formatTime(timeString: string, format: string = 'shortTime'): string | null {
    // Podelite string vremena na delove (sat, minut, sekund)
    const timeParts = timeString.split(':');
    if (timeParts.length !== 3) {
      return null; // Vraća null ako format nije ispravan
    }

    // Kreirajte novi Date objekat i postavite sate, minute i sekunde
    const date = new Date();
    date.setHours(+timeParts[0]);
    date.setMinutes(+timeParts[1]);
    date.setSeconds(+timeParts[2]);

    // Koristite DatePipe da formatirate vreme
    return this.datePipe.transform(date, format);
  }

  locationSelected(autocompleteResult: AutocompleteResult) {
    if (typeof document !== 'undefined') {
      // Your code that accesses `document` here
      const dropdown = document.getElementById('autocomplete-result');
      this.locationQuery = `${autocompleteResult.city}, ${autocompleteResult.country}`;
      this.locationService.autocompleteResult.set([]);
      this.weatherService.getWeatherData(this.locationQuery);

      // return document.getElementById('weatherImage');
    }
    return null;
  }

  deleteAlarmAction(alarmId: number) {
    if (this.currentUser)
      this.alarmService.deleteAlarm(this.currentUser.id, alarmId);
  }

  callForAutocomplete() {
    if (this.locationQuery.trim().length > 0 && !this.changeBlocker()) {
      this.changeBlocker.set(true);
      setTimeout(() => {
        this.locationService.getLocationAutocomplete(this.locationQuery.trim());
        this.changeBlocker.set(false);
      }, 1000);
    }
  }

  get weatherImage(): string {
    if (typeof document !== 'undefined') {
      // Your code that accesses `document` here

      const body = document.body;
      const icon =
        this.weatherService.weatherData()?.currentConditions.icon ?? '';
      const BASE_URL = 'url(/assets/images/';
      this.renderer.removeClass(body, 'sunny-background');
      this.renderer.removeClass(body, 'rainy-background');
      this.renderer.removeClass(body, 'snowy-background');
      this.renderer.removeClass(body, 'cloudy-background');
      if (icon === 'clear-day') {
        this.renderer.addClass(body, 'sunny-background');
        return BASE_URL + 'day/sunny.jpg' + ')';
      }
      if (['cloudy', 'fog', 'wind'].includes(icon)) {
        this.renderer.addClass(body, 'cloudy-background');
        return BASE_URL + 'day/cloudy.jpg' + ')';
      }
      if (['partly-cloudy-day'].includes(icon)) {
        this.renderer.addClass(body, 'partly-cloudy-background');
        return BASE_URL + 'day/partly-cloudy.jpg' + ')';
      }
      if (
        [
          'rain',
          'rain-snow',
          'rain-snow-showers-day',
          'showers-day',
          'thunder',
          'thunder-rain',
          'thunder-showers-day',
          'wind',
        ].includes(icon)
      ) {
        this.renderer.addClass(body, 'rainy-background');
        return BASE_URL + 'day/rainy.jpg' + ')';
      }
      if (
        [
          'rain-snow-showers-day',
          'hail',
          'sleet',
          'snow',
          'snow-showers-day',
        ].includes(icon)
      ) {
        this.renderer.addClass(body, 'snowy-background');
        return BASE_URL + 'day/snowy.jpg' + ')';
      }
      if (icon === 'clear-night') {
        this.renderer.addClass(body, 'clear-night-background');
        return BASE_URL + 'night/clear.jpg' + ')';
      }
      if (['partly-cloudy-night'].includes(icon)) {
        this.renderer.addClass(body, 'cloudy-background');
        return BASE_URL + 'night/cloudy.jpg' + ')';
      }
      if (
        [
          'rain',
          'rain-snow',
          'rain-snow-showers-night',
          'showers-night',
          'thunder-rain',
        ].includes(icon)
      ) {
        this.renderer.addClass(body, 'rainy-background');
        return BASE_URL + 'night/rainy.jpg' + ')';
      }
      if (
        [
          'rain-snow-showers-night',
          'hail',
          'sleet',
          'snow',
          'snow-showers-night',
        ].includes(icon)
      ) {
        this.renderer.addClass(body, 'cloudy-background');
        return BASE_URL + 'night/snowy.jpg' + ')';
      }
      return '';
      // return document.getElementById('weatherImage');
    }
    return '';
  }

  visibleAlarm = false;

  toggleCollapse(): void {
    this.visibleAlarm = !this.visibleAlarm;
  }

  openDetails(index: number) {
    this.router.navigate(['/daily-details', index]); // Navigacija na novu stranicu sa ID-jem
  }
}
