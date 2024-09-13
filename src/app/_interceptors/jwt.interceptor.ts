import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Definiši URL-ove gde NE želiš da dodaješ Authorization header
  const externalUrls = [
    'https://api.geoapify.com',
    'https://weather.visualcrossing.com',
  ];

  // Proveri da li URL zahteva odgovara bilo kom od eksternih API-ja
  const isExternal = externalUrls.some((url) => req.url.startsWith(url));

  // Ako nije eksterni API i korisnik je prijavljen, dodaj Authorization header
  if (!isExternal && authService.currentUser() !== null) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.currentUser()?.token}`,
      },
    });
  }

  return next(req);
};
