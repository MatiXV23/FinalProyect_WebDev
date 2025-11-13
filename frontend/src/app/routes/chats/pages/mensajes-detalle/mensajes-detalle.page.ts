import { Component, effect, inject, input, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from '../../../../shared/services/chats.service';
import { MainStore } from '../../../../shared/stores/main.store';

@Component({
  selector: 'app-mensajes-detalle',
  imports: [],
  templateUrl: './mensajes-detalle.page.html',
  styleUrl: './mensajes-detalle.page.css',
})
export class MensajesDetallePage {
  private route = inject(ActivatedRoute);
  private chatService = inject(ChatsService)
  private mainStore = inject(MainStore)

  id_chat = this.route.snapshot.paramMap.get('id_chat');

  fecha_nueva = true

  mensajes = resource({
    params: () => ({id: this.id_chat}),
    loader: ({params}) => this.chatService.getMensajes(params.id!)
  })

  isUserLogged(id_usuario: number): boolean {
    return this.mainStore.isUserLogged(id_usuario)
  }

  parseDate(dateTime: string){
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  parseTime(dateTime: string){ 
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
  }
}


