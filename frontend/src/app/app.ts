import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  IonContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonMenu,
  MenuController,
  IonIcon,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { AuthService } from './shared/services/auth.service';
import { MainStore } from './shared/stores/main.store';
import { WebsocketService } from './shared/services/websocket.service';
import { addIcons } from 'ionicons'
import {   bicycle,  home,  location,  documentText,  cube,  ribbon,  chatbubbles,  person,  cart,  flash,  shieldCheckmark, logIn, statsChart, addCircle, logOut, close, storefront, } from 'ionicons/icons';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    IonContent,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonMenu,
    IonSplitPane,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  private wsService = inject(WebsocketService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private mainStore = inject(MainStore);

  isMobile = signal<boolean>(Boolean(window.innerWidth < 768));

  @HostListener('window:resize')
  onResize() {
    const isMobile = Boolean(window.innerWidth < 768);
    this.isMobile.set(isMobile);
  }

  isLogged = this.mainStore.isLogged;
  user = this.mainStore.user;

  avatarImgUrl = computed(() => (this.user() ? this.user()?.foto_url : '/assets/imgs/avatar.png'));

  wsConnetion = effect(() => {
    if (this.user()) {
      this.wsService.connect(this.mainStore.user()!.id_usuario);
    }
  });

  async ngOnInit() {
    await this.authService.checkLocalStorage();
  }


  constructor(private menuCtrl: MenuController) {
    addIcons({bicycle, home, location, documentText, cube, ribbon, chatbubbles, logOut, person, cart, flash, shieldCheckmark, logIn, statsChart, addCircle, close, storefront })
  }

  openMenu() {
    this.menuCtrl.open('menu');
  }
  closeMenu() {
    this.menuCtrl.close('menu');
  }

  async handleLogOut(event: any) {
    this.closeMenu();
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
