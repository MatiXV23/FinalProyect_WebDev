import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { UserPwd_Foto } from '../../../../shared/types/usuario';
import { IonRouterLinkWithHref, IonIcon } from '@ionic/angular/standalone';
import { UsuariosFormComponent } from '../../components/usuarios-form/usuarios-form.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-usuarios-register',
  imports: [FormsModule, UsuariosFormComponent, IonRouterLinkWithHref, RouterLink, IonIcon],
  templateUrl: './usuarios-register.page.html',
  styleUrl: './usuarios-register.page.css',
})
export class UsuariosRegisterPage {
  private usuarioService: UsuariosService = inject(UsuariosService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  async handleRegister(userPwdFoto: UserPwd_Foto) {
    const { foto, pwdUser } = userPwdFoto;

    try {
      const user = await this.usuarioService.postUsuario(pwdUser);
      await this.authService.logIn({ email: user.email, password: pwdUser.password });
      if (foto) await this.usuarioService.updateUserFoto(user.id_usuario, foto);

      this.notificationService.showSuccess('Usuario creado con exito! Inicia sesion');
      this.router.navigate(['cuenta']);
    } catch (e) {
      throw e;
    }
  }
}
