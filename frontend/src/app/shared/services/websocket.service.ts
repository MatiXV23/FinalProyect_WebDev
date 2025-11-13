import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private ws?: WebSocket;
  public recargarMensajes = signal<Boolean>(false);
  public recargarUsuario = signal<Boolean>(false);

  public conectar(id: number) {
    this.ws = new WebSocket(`ws://localhost:3000/ws?id_usuario=${id}`);

    this.ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (data && data.mensaje) {
        switch (data.mensaje.type) {
          case 'Nuevo_mensaje':
            this.recargarMensajes.set(true);
            break;
          case 'Usuario_editado':
            this.recargarUsuario.set(true);
            break;
        }
      }
    };
  }

  public limpiarSeniales() {
    this.recargarMensajes.set(false);
    this.recargarUsuario.set(false);
  }
}
