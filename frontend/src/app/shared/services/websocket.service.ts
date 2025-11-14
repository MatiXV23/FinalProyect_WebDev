import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private ws?: WebSocket;

  shouldMsgReload = signal(false);

  connected = signal(false);

  connect(id_usuario: number) {
    this.ws = new WebSocket(`ws://localhost:3000/ws?id_usuario=${id_usuario}`);
    this.ws.onopen = () => {
      this.connected.set(true);
    };

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.data) {
        switch (msg.data.type) {
          case 'nuevo_mensaje':
            this.shouldMsgReload.set(true);
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
  }
}
