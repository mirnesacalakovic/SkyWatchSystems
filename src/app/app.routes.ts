import { provideRouter, Routes, withDebugTracing } from '@angular/router';
import { WeatherComponent } from './_pages/weather/weather.component';
import { ApplicationConfig } from '@angular/core';
import { LoginComponent } from './_pages/login/login.component';
import { RegisterComponent } from './_pages/register/register.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { authGuard } from './_guards/auth.guard';
import { historyResolver } from './_resolvers/history.resolver';
import { PercipChartComponent } from './_components/percip-chart/percip-chart.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: historyResolver,
    // canActivate: [authGuard],
    
  },
  {
    path: 'dashboard2',
    component: PercipChartComponent,
    resolve: historyResolver,
    // canActivate: [authGuard],
    
  },
  { path: '', component: WeatherComponent, pathMatch: 'full' },
];
