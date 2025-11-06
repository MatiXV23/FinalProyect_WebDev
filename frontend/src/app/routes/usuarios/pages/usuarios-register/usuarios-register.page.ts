import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../../shared/types/usuario';
import { UsuarioSinId } from '../../../../shared/types/usuario';
import {
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonCard,
  IonInputPasswordToggle,
  IonCardSubtitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-usuarios-register',
  imports: [IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle],
  templateUrl: './usuarios-register.page.html',
  styleUrl: './usuarios-register.page.css',
})
export class UsuariosRegisterPage {
  private usuarioService: UsuariosService = inject(UsuariosService);
  private router = inject(Router);
  public usuario = signal<Usuario[]>([]);

  async handleRegister(Usuario: UsuarioSinId) {
    try {
      const usuarioNuevo = await this.usuarioService.postUsuario(Usuario);
      this.router.navigate(['cuenta']);
    } catch (e) {
      throw e;
    }
  }
}
