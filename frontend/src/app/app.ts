import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IonContent, IonTitle, IonHeader, IonToolbar, IonMenu, MenuController, IonIcon, IonSplitPane } from "@ionic/angular/standalone";
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, IonContent, IonTitle, IonHeader, IonToolbar, IonMenu, IonSplitPane],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  constructor(private menuCtrl: MenuController) {}
  private router = inject(Router)
  private authService = inject(AuthService)

  labelPlacement = signal<'start' | 'stacked'>('stacked');
  isMobile = signal<boolean>(Boolean(window.innerWidth < 768))
  
  isLogged = this.authService.isLogged

  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(Boolean(window.innerWidth < 768))
    this.labelPlacement.set(window.innerWidth > 768 ? 'start' : 'stacked');
    console.log(window.innerWidth, this.labelPlacement(), this.isMobile())
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
