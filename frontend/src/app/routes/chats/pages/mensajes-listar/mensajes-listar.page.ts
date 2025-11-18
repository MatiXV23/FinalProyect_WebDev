import { Component, inject, resource } from '@angular/core';
import { IonSplitPane, IonMenu, IonContent, IonButton, IonAvatar, MenuController, IonIcon } from "@ionic/angular/standalone";
import { RouterOutlet, RouterLink } from "@angular/router";
import { ChatsService } from '../../../../shared/services/chats.service';
import { ChatNombres } from '../../../../shared/types/chats';
import { MainStore } from '../../../../shared/stores/main.store';
import { addIcons } from 'ionicons'
import { chatbubble, chatbubbleOutline } from 'ionicons/icons';
 
@Component({
  selector: 'app-mensajes-listar',
  imports: [IonSplitPane, IonMenu, IonContent, RouterOutlet, RouterLink, IonAvatar, IonIcon],
  templateUrl: './mensajes-listar.page.html',
  styleUrl: './mensajes-listar.page.css',
})
export class MensajesListarPage {
  private chatService = inject(ChatsService)
  private mainStore = inject(MainStore)

  chats = resource({
    loader: () => this.chatService.getAllChatsNombres()
  })

  constructor(private menuCtrl: MenuController) {
    this.openMenu()
    addIcons({chatbubble, chatbubbleOutline})
  }
  
  openMenu() {
    this.menuCtrl.open('chatsMenuId');
  }
  closeMenu() {
    this.menuCtrl.close('chatsMenuId');  
  }
}
