import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.currentUser() !== null){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.currentUser()?.token}`
      }
    })
  }

  return next(req);
};
