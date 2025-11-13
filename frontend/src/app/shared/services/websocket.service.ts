import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private ws?: WebSocket;
  
  shouldReload = signal(false);
  
  connected = signal(false);

  connect(id_usuario: number) {
    this.ws = new WebSocket(`ws://localhost:3000/ws?id_usuario=${id_usuario}`);
    
    this.ws.onopen = () => {
      console.log('WebSocket conectado');
      this.connected.set(true);
    };
    
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log('WS msg: ', msg);
      
      if (msg.messageData && msg.messageData.type === "nuevo_mensaje") {
        this.shouldReload.set(true);
      }
    };
    
    this.ws.onerror = (error) => {
      console.error('WS Error:', error);
    };
    
    this.ws.onclose = () => {
      console.log('WS Cerrado');
      this.connected.set(false);
    };
  }

  disconnect() {
    this.ws?.close();
    this.connected.set(false);
  }

  resetReload() {
    this.shouldReload.set(false);
  }
}
