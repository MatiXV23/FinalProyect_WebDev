import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private authService = inject(AuthService)

  private ws?: WebSocket;

  shouldMsgReload = signal(false);
  shouldCarritoReload = signal(false);

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
            await this.authService.getUser()
            break;
          case 'carrito_editado':
            await this.authService.getUser()
            this.shouldCarritoReload.set(true);
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
    this.ws?.close();
    this.connected.set(false);
  }
}
