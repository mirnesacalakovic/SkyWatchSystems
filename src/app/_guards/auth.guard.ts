import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.currentUser() !== null)
    return true;
  else{
    return false;
  }
};
