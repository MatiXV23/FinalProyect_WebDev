import { Component, computed, effect, HostListener, inject, input, OnInit, resource, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { ChatsService } from '../../../../shared/services/chats.service';
import { MainStore } from '../../../../shared/stores/main.store';
import { IonInput, IonIcon, IonButton, MenuController, IonAvatar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../../../../shared/services/websocket.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-mensajes-detalle',
  imports: [IonInput, IonIcon, IonButton, FormsModule, IonAvatar, RouterLink],
  templateUrl: './mensajes-detalle.page.html',
  styleUrl: './mensajes-detalle.page.css',
})
export class MensajesDetallePage {
  private wsService = inject(WebsocketService);
  private route = inject(ActivatedRoute);
  private chatService = inject(ChatsService);
  private mainStore = inject(MainStore);

  private params = toSignal(this.route.paramMap);
  
  isMobile = signal<boolean>(Boolean(window.innerWidth < 991))
  
  @HostListener('window:resize')
  onResize() {
    const isMobile = Boolean(window.innerWidth < 991)
    this.isMobile.set(isMobile)
  }

  id_chat = computed(() => this.params()?.get('id_chat') ?? null);
  fecha_vieja = '1/1/2001';
  
  contenido = '';
  
  chat = resource({
    params: () => ({ id: this.id_chat() }),
    loader: ({ params }) => this.chatService.getChatNombresById(params.id!),
  })

  mensajes = resource({
    params: () => ({ id: this.id_chat() }),
    loader: ({ params }) => this.chatService.getMensajes(params.id!),
  });

  msgReload = effect(() => {
    if (this.wsService.shouldMsgReload()) {
      this.mensajes.reload();
      this.wsService.resetReload();
    }
  });

  msgScroll = effect(() => {
    if (this.mensajes.value()) {
      this.scrollDown();
    }
  });

  constructor(private menuCtrl: MenuController) {}

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
    await this.chatService.sendMessage(this.id_chat()!, this.contenido);
    setTimeout(() => {
      this.contenido = '';
    }, 0);
    this.mensajes.reload();
  }

  scrollDown() {
    setTimeout(() => {
      const element = document.getElementById('bottomCont');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }

  openMenu() {
    this.menuCtrl.open('chatsMenuId');
  }
  closeMenu() {
    this.menuCtrl.close('chatsMenuId');
  }
}

