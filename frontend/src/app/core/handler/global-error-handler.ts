import { ErrorHandler, Injectable, inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private notificationService = inject(NotificationService);

  handleError(error: any): void {
    console.error('Error capturado por GlobalErrorHandler:', error);

    
    let errorMessage = 'Ha ocurrido un error inesperado';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    this.notificationService.showError(errorMessage, 5000);
  }
}