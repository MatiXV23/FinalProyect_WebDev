import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private ws?: WebSocket;

  shouldMsgReload = signal(false);

  shouldUserReload = signal(false);

  connected = signal(false);

  connect(id_usuario: number) {
    this.ws = new WebSocket(environment.wsUrl + id_usuario);
    this.ws.onopen = () => {
      this.connected.set(true);
    };

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.data) {
        switch (msg.data.type) {
          case 'nuevo_mensaje':
            this.shouldMsgReload.set(true);
            break;
          case 'Usuario_editado':
            this.shouldUserReload.set(true);
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

  resetReload() {
    this.shouldMsgReload.set(false);
    this.shouldUserReload.set(false);
  }
}
