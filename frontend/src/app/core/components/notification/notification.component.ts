import { Component, inject, OnInit, signal } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';
import { IonCard, IonButton, IonIcon, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [IonCard, IonButton, IonIcon, IonCardContent],
})
export class NotificationComponent  implements OnInit {
  private notificationService = inject(NotificationService);
  activeNotifications= signal<Notification[]>([]);

  ngOnInit() {
    this.notificationService.notifications$.subscribe(notification => {
      if (!notification.message) {
        this.activeNotifications.set(this.activeNotifications().filter(
          n => n.id !== notification.id
        ));
      } else {
        this.activeNotifications.set([...this.activeNotifications(), notification]);
      }
    });
  }

  close(id: string) {
    this.notificationService.remove(id);
  }
}
