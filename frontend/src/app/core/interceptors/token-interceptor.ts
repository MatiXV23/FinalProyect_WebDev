import { HttpInterceptorFn } from '@angular/common/http';
import { MainStore } from '../../shared/stores/main.store';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const mainStore = inject(MainStore)

  if (!mainStore.token()) {   return next(req);   }

  return next(req.clone({
      headers: req.headers.set('Authorization', `Bearer ${mainStore.token()}`),
    }));
};
