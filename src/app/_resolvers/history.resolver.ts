import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HistoryService } from '../_services/history.service';
import { LocationService } from '../_services/location.service';

export const historyResolver: ResolveFn<boolean> = (route, state) => {
  const historyService = inject(HistoryService);
  const locationService = inject(LocationService);

  const location = locationService.location();
  if (!location) return false;

  historyService.getHistoryData(location.features[0].properties.formatted);

  return true;
};
