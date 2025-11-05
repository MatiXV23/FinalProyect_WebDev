import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MainStore } from '../../shared/stores/main.store';
import { AuthService } from '../../shared/services/auth.service';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  
  return !authService.isLogged() ? router.navigate(['/login']) : true
};
