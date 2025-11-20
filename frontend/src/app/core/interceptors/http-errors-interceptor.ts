import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error en la comunicación con el servidor';

      errorMessage = error.status === 0 ? errorMessage : error.error.message;
      console.log({ errorMessage, req });

      if (error.error && error.error.error === 'PC_NotFound') throw error;

      notificationService.showError(errorMessage, 5000);

      throw error;
    })
  );
};
