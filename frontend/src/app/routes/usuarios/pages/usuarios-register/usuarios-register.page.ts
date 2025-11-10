import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario, UsuarioConPwd } from '../../../../shared/types/usuario';
import { UsuarioSinId } from '../../../../shared/types/usuario';
import {
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonCard,
  IonInputPasswordToggle,
  IonCardSubtitle,
  IonRouterLinkWithHref,
} from '@ionic/angular/standalone';
import { UsuariosFormComponent } from '../../components/usuarios-form/usuarios-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-register',
  imports: [
    FormsModule,
    IonCardHeader,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    UsuariosFormComponent,
    IonRouterLinkWithHref,
    RouterLink,
  ],
  templateUrl: './usuarios-register.page.html',
  styleUrl: './usuarios-register.page.css',
})
export class UsuariosRegisterPage {
  private usuarioService: UsuariosService = inject(UsuariosService);
  private router = inject(Router);
  public usuario = signal<Usuario[]>([]);

  async handleRegister(Usuario: UsuarioConPwd) {
    try {
      const usuarioNuevo = await this.usuarioService.postUsuario(Usuario);
      this.router.navigate(['cuenta']);
    } catch (e) {
      throw e;
    }
  }
}
