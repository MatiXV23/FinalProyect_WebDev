import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonContent, IonTitle, IonHeader, IonToolbar, IonMenu, MenuController, IonIcon, IonSplitPane } from "@ionic/angular/standalone";
import { AuthService } from './shared/services/auth.service';
import { MainStore } from './shared/stores/main.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, IonContent, IonTitle, IonHeader, IonToolbar, IonMenu, IonSplitPane],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit{
  protected readonly title = signal('frontend');

  private router = inject(Router)
  private authService = inject(AuthService)
  private mainStore = inject(MainStore)

  isMobile = signal<boolean>(Boolean(window.innerWidth < 768))
  

  isLogged = this.mainStore.isLogged
  user = this.mainStore.user
  
  avatarImgUrl = computed(()=> this.user() ? this.user()?.foto_url : '/assets/imgs/avatar.png')

  async ngOnInit() {
    await this.authService.checkLocalStorage()
  }


  constructor(private menuCtrl: MenuController) {}

  @HostListener('window:resize')
  onResize() {
    const isMobile = Boolean(window.innerWidth < 768)
    if (!isMobile) return
    
    this.isMobile.set(isMobile)
    
  }

  openMenu() {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    this.menuCtrl.open('menu');
  }
  closeMenu() {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    this.menuCtrl.close('menu');
  }

  async handleLogOut(event: any) {
    this.closeMenu()
    this.authService.logOut()
    this.router.navigate(['/login'])
  }

}
