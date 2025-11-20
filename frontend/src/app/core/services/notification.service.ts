import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
}


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  
  private notificationSubject = new Subject<Notification>();
  public notifications$ = this.notificationSubject.asObservable();

  showError(message: string, duration: number = 5000) {
    const notification: Notification = {
      id: this.generateId(),
      message,
      type: 'error'
    };

    this.notificationSubject.next(notification);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);
      }, duration);
    }
  }

  showSuccess(message: string, duration: number = 5000) {
    const notification: Notification = {
      id: this.generateId(),
      message,
      type: 'success'
    };

    this.notificationSubject.next(notification);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);
      }, duration);
    }
  }

  remove(id: string) {
    this.notificationSubject.next({ id, message: '', type: 'error' });
  }

  private generateId(): string {
    return `notification-${Date.now()}`;
  }
}