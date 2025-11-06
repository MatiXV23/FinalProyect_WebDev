import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MainStore } from '../../shared/stores/main.store';
import { AuthService } from '../../shared/services/auth.service';

export const isAdminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  const mainStore = inject(MainStore)

  await authService.checkLocalStorage()
  const user = mainStore.user()

  if (!user || !user.is_admin) return router.createUrlTree(['/home'])

  return true;
};
