import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withDebugTracing()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
        NG_EVENT_PLUGINS, provideCharts(withDefaultRegisterables())
    ],
};
