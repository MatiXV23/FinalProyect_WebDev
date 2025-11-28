import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  private ws?: WebSocket;

  shouldMsgReload = signal(false);
  shouldCarritoReload = signal(false);
  shouldReloadVentas = signal(false);

  connected = signal(false);

  connect(id_usuario: number) {
    this.ws = new WebSocket(environment.wsUrl + id_usuario);
    this.ws.onopen = () => {
      this.connected.set(true);
    };

    this.ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data);

      if (msg.data) {
        switch (msg.data.type) {
          case 'nuevo_mensaje':
            this.shouldMsgReload.set(true);
            break;
          case 'usuario_editado':
            await this.authService.getUser();
            break;
          case 'carrito_editado':
            await this.authService.getUser();
            this.shouldCarritoReload.set(true);
            break;
          case 'venta_realizada':
            this.shouldReloadVentas.set(true);
            this.notificationService.showSuccess(
              'Has vendido un articulo, puedes verlo en la seccion "Mis Ventas"',
              1000
            );
            break;
        }
      }
    };

    this.ws.onerror = (error) => {
      console.error('WS Error:', error);
    };

    this.ws.onclose = () => {
      this.connected.set(false);
    };
  }

  disconnect() {
    if (this.connected()) {
      this.ws?.close(1000, 'Cliente cerró la conexión');
      this.connected.set(false);
    }
  }

  resetVentasReload() {
    this.shouldReloadVentas.set(false);
  }
}
