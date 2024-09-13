import { provideRouter, Routes, withDebugTracing } from '@angular/router';
import { WeatherComponent } from './_pages/weather/weather.component';
import { ApplicationConfig } from '@angular/core';
import { LoginComponent } from './_pages/login/login.component';
import { RegisterComponent } from './_pages/register/register.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { authGuard } from './_guards/auth.guard';
import { historyResolver } from './_resolvers/history.resolver';
import { PercipChartComponent } from './_components/percip-chart/percip-chart.component';
import { TechnicalDashboardComponent } from './_pages/technical-dashboard/technical-dashboard.component';
import { DailyDetailsComponent } from './_pages/daily-details/daily-details.component';
import { adminGuard } from './_guards/admin.guard';
import { techGuard } from './_guards/tech.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'daily-details/:id', component: DailyDetailsComponent },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    resolve: historyResolver,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'technical/dashboard',
    component: TechnicalDashboardComponent,
    resolve: historyResolver,
    canActivate: [authGuard, techGuard],
  },
  { path: '', component: WeatherComponent, pathMatch: 'full' },
];
