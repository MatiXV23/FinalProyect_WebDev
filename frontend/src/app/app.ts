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
import {   bicycle,  home,  location,  documentText,  cube,  ribbon,  chatbubbles,  person,  cart,  flash,  shieldCheckmark, logIn, statsChart, addCircle, logOut, close, storefront, arrowBack, arrowForwardCircle, chatbubblesOutline, chevronForward, menu, notifications, send, list, trash, pricetag, pencil, add, card, cartOutline, logoPaypal, receipt, remove, search, ticket, wallet, star, fingerPrint, mail, people, peopleOutline, pricetags, pricetagsOutline, cubeOutline, checkmark, apps, cash, image, checkmarkCircle, calendarOutline, cardOutline, informationCircle, lockClosed, returnDownBack, shieldCheckmarkOutline, arrowForward, imageOutline, refresh, searchOutline, chatbubble, chatbubbleOutline, starHalf, starOutline, chatboxEllipses, createOutline, ellipsisHorizontal, map, personCircle } from 'ionicons/icons';


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
  constructor(private menuCtrl: MenuController) {
    addIcons({
      bicycle, home, location, documentText, cube, ribbon,
      chatbubbles, chatbubblesOutline, menu,

      logOut, logIn, person, storefront, cart, cartOutline,
      flash, shieldCheckmark, statsChart, addCircle, close,

      arrowForwardCircle, arrowBack, chevronForward, send,
      list, trash, pricetag, pencil, cubeOutline, checkmark,

      remove, add, receipt, ticket, card, notifications,

      search, logoPaypal, wallet, star,
      people, mail, fingerPrint, peopleOutline, pricetags, pricetagsOutline,

      apps, cash, image, checkmarkCircle, shieldCheckmarkOutline,
      lockClosed, cardOutline, calendarOutline, informationCircle, returnDownBack,

      searchOutline, refresh, imageOutline, arrowForward, chatbubble, chatbubbleOutline,
      starOutline, starHalf, chatboxEllipses, ellipsisHorizontal, createOutline, personCircle, map,
    });
  }
}
