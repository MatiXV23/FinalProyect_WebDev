import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonInputPasswordToggle,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { Credenciales } from '../../../../shared/types/credenciales';

@Component({
  selector: 'app-usuarios-login',
  templateUrl: './usuarios-login.page.html',
  styleUrls: ['./usuarios-login.page.css'],
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonInput,
    IonInputPasswordToggle,
    IonText,
    IonButton,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsuariosLoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  credenciales = signal<Credenciales>({
    email: '',
    password: '',
  });

  async handleSessionInit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((c) => c.markAsTouched());
      return;
    }

    try {
      await this.authService.logIn(this.credenciales());
      this.router.navigate(['/home']);
    } catch (e) {
      console.error('Error al iniciar sesión:', e);
    }
  }
}
