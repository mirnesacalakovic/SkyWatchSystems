import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const techGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = authService.currentUser();

  if (user?.roles.includes('Tech')) {
    return true;
  }
  return false;
};
