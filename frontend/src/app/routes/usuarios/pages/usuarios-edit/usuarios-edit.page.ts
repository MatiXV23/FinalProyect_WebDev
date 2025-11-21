import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosFormComponent } from '../../components/usuarios-form/usuarios-form.component';
import { IonInput, IonIcon, IonInputPasswordToggle, IonButton } from '@ionic/angular/standalone';
import { MainStore } from '../../../../shared/stores/main.store';
import { UsuarioConPwd, Usuario, UserPwd_Foto } from '../../../../shared/types/usuario';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-usuarios-edit',
  imports: [
    UsuariosFormComponent,
    IonIcon,
    FormsModule,
    IonInputPasswordToggle,
    IonInput,
    IonButton,
  ],
  templateUrl: './usuarios-edit.page.html',
  styleUrl: './usuarios-edit.page.css',
})
export class UsuariosEditPage {
  private mainStore = inject(MainStore);
  private usuariosService = inject(UsuariosService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user = resource({
    params: () => ({ id: this.route.snapshot.paramMap.get('id_usuario') }),
    loader: ({ params }) => {
      if (!params.id)
        return this.usuariosService.getUserById(String(this.mainStore.user()?.id_usuario));
      return this.usuariosService.getUserById(params.id);
    },
  });

  async updateUser(userPwdFoto: UserPwd_Foto) {
    const { foto, pwdUser } = userPwdFoto;
    const id_usuario = this.user.value()!.id_usuario;

    const data: Partial<Usuario> = {
      ...pwdUser,
      id_usuario: id_usuario,
    };
    try {
      if (foto) await this.usuariosService.updateUserFoto(id_usuario, foto);
      await this.usuariosService.updateUsuario(data);

      this.notificationService.showSuccess('Usuario editado correctamente', 1000);
      this.router.navigate(['/cuenta']);
    } catch (e) {
      throw new Error('Ocurrio un error al editar el usuario');
    }
  }

  isUserLogged = computed(() => {
    const user = this.user.value();
    if (!user) return false;
    return this.mainStore.isUserLogged(user.id_usuario);
  });

  pass = signal<string>('');
  passRepeat = signal<string>('');

  passwordsDontCheck = computed(() => {
    return this.pass() !== this.passRepeat();
  });

  async updatePassword() {
    await this.usuariosService.updateUserPwd(this.user.value()!.id_usuario, this.pass());
    this.pass.set('');
    this.passRepeat.set('');
  }
}
