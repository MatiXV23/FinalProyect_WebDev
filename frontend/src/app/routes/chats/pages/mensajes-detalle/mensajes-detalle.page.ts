import { Component, effect, inject, input, OnInit, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from '../../../../shared/services/chats.service';
import { MainStore } from '../../../../shared/stores/main.store';
import { IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../../../../shared/services/websocket.service';

@Component({
  selector: 'app-mensajes-detalle',
  imports: [IonInput, IonIcon, IonButton, FormsModule],
  templateUrl: './mensajes-detalle.page.html',
  styleUrl: './mensajes-detalle.page.css',
})
export class MensajesDetallePage implements OnInit {
  ngOnInit(): void {
    this.webSocketService.conectar(Number(this.mainStore.user()?.id_usuario));
  }
  private route = inject(ActivatedRoute);
  private chatService = inject(ChatsService);
  private mainStore = inject(MainStore);
  private webSocketService = inject(WebsocketService);

  id_chat = this.route.snapshot.paramMap.get('id_chat');

  fecha_vieja = '1/1/2001';

  contenido = '';

  mensajes = resource({
    params: () => ({ id: this.id_chat }),
    loader: ({ params }) => this.chatService.getMensajes(params.id!),
  });

  controladorRecarga = effect(() => {
    if (this.webSocketService.recargarMensajes()) {
      this.mensajes.reload();
      this.webSocketService.limpiarSeniales();
    }
  });

  isUserLogged(id_usuario: number): boolean {
    return this.mainStore.isUserLogged(id_usuario);
  }

  parseDate(dateTime: string) {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  parseTime(dateTime: string) {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  debeImprimirFecha(fecha_actual: string, fecha_vieja: string): boolean {
    return fecha_vieja !== fecha_actual;
  }

  async sendMessage(event: any) {
    if (!this.contenido) return;
    await this.chatService.sendMessage(this.id_chat!, this.contenido);
    setTimeout(() => {
      this.contenido = '';
    }, 0);
    this.mensajes.reload();
  }
}
