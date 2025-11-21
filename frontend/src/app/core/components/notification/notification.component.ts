import { Component, inject, OnInit, signal } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';
import { IonCard, IonButton, IonIcon, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [IonCard, IonButton, IonIcon, IonCardContent],
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  activeNotifications = signal<Notification[]>([]);

  getNotificationColors(type: 'error' | 'success' | 'info' | 'warning'): string[] {
    switch (type) {
      case 'error':
        return ['text-red-600', 'text-red-800', 'hover:text-red-900', 'border-red-500 bg-red-50'];
      case 'success':
        return [
          'text-green-600',
          'text-green-800',
          'hover:text-green-900',
          'border-green-500 bg-green-50',
        ];
      case 'info':
        return [
          'text-blue-600',
          'text-blue-800',
          'hover:text-blue-900',
          'border-blue-500 bg-blue-50',
        ];
      default:
        return [
          'text-yellow-600',
          'text-yellow-800',
          'hover:text-yellow-900',
          'border-yellow-500 bg-yellow-50',
        ];
    }
  }

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notification) => {
      if (!notification.message) {
        this.activeNotifications.set(
          this.activeNotifications().filter((n) => n.id !== notification.id)
        );
      } else {
        this.activeNotifications.set([...this.activeNotifications(), notification]);
      }
    });
  }

  close(id: string) {
    this.notificationService.remove(id);
  }
}
