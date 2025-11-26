import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonCard,
  IonInputPasswordToggle,
  IonCardSubtitle,
  IonRouterLinkWithHref,
} from '@ionic/angular/standalone';
import { IonInput } from '@ionic/angular/standalone';
import { Credenciales } from '../../../../shared/types/credenciales';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-usuarios-login',
  imports: [IonInput, IonInputPasswordToggle, IonRouterLinkWithHref, RouterLink, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './usuarios-login.page.html',
  styleUrl: './usuarios-login.page.css',
})
export class UsuariosLoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  credenciales = signal<Credenciales>({
    email: '',
    password: '',
  });

  async handleSessionInit(event: any) {
    try {
      await this.authService.logIn(this.credenciales());
      this.router.navigate(['/home']);
    } catch (e) {
      console.log(e);
    }
  }

  async extraConnection(connector_name: 'Facebook' | 'Google') {
    throw new Error(`Funcionalidad para iniciar sesion via ${connector_name} no implementada aun`);
  }
}
