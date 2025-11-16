import { Component, HostListener, inject, signal } from '@angular/core';
import { IonIcon, MenuController, IonButton } from "@ionic/angular/standalone";
import { MainStore } from '../../../../shared/stores/main.store';

@Component({
  selector: 'app-no-chat',
  templateUrl: './no-chat.page.html',
  styleUrls: ['./no-chat.page.scss'],
  imports: [IonIcon, IonButton],
})
export class NoChatPage {

  isMobile = signal<boolean>(Boolean(window.innerWidth < 991))
  
  @HostListener('window:resize')
  onResize() {
    const isMobile = Boolean(window.innerWidth < 991)
    this.isMobile.set(isMobile)
  }

  constructor(private menuCtrl: MenuController) {}

  openMenu() {
    this.menuCtrl.open('chatsMenuId');
  }
  closeMenu() {
    this.menuCtrl.close('chatsMenuId');
  }
}
