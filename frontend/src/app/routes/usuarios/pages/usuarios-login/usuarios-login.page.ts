import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCard, IonInputPasswordToggle, IonCardSubtitle, IonRouterLinkWithHref } from '@ionic/angular/standalone';
import { IonInput } from '@ionic/angular/standalone';
import { Credenciales } from '../../../../shared/types/credenciales';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-usuarios-login',
  imports: [IonInput, IonCard, IonInputPasswordToggle, IonCardSubtitle, IonRouterLinkWithHref, RouterLink, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './usuarios-login.page.html',
  styleUrl: './usuarios-login.page.css',
})
export class UsuariosLoginPage {
  private authService = inject(AuthService)

  credenciales = signal<Credenciales>({
    email: '',
    password: ''
  })

  async handleSessionInit(event: any){
    console.log("credenciales: ",this.credenciales())

    await this.authService.logIn(this.credenciales())
  }
}
