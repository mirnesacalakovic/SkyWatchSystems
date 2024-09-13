import {
  Component,
  NgModule,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { HistoryService } from '../../_services/history.service';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { History } from '../../_models/history/history';
import { LocationService } from '../../_services/location.service';
import { PercipChartComponent } from '../../_components/percip-chart/percip-chart.component';
import { AutocompleteResult } from '../../_models/location/autocomplete';
import { FormsModule } from '@angular/forms';
import { TempChartComponent } from '../../_components/temp-chart/temp-chart.component';
import { NgFor, NgIf } from '@angular/common';
import { HumidityChartComponent } from "../../_components/humidity-chart/humidity-chart.component";
import { WindChartComponent } from "../../_components/wind-chart/wind-chart.component";
import { CloudChartComponent } from "../../_components/cloud-chart/cloud-chart.component";
import { UvIndexChartComponent } from "../../_components/uv-index-chart/uv-index-chart.component";
import { SnowChartComponent } from "../../_components/snow-chart/snow-chart.component";
import { AuthService } from '../../_services/auth.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BaseChartDirective,
    PercipChartComponent,
    FormsModule,
    NgIf,
    NgFor,
    TempChartComponent,
    HumidityChartComponent,
    WindChartComponent,
    CloudChartComponent,
    UvIndexChartComponent,
    SnowChartComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public barChartLegend = true;
  public toggle = false;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      TooltipModule
    ],
    datasets: [
      {
        data: [],
        label: 'Temperature',
      },
    ],
  };

  locationQuery = '';
  changeBlocker: WritableSignal<boolean> = signal(false);
  location: WritableSignal<Location | null> = signal(null);

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(
    public historyService: HistoryService,
    private locationService: LocationService,
    private authService: AuthService
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
      this.historyService
        .getHistoryData(this.locationQuery)
        .subscribe((data: any) => {
          this.historyService.historyData.set(data);
          console.log('DEBUG DATA: ', data);
        });
    }
  }
  logout() {
    this.authService.logout();
  }
  
}
