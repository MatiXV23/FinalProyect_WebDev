import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
  resource,
  signal,
} from '@angular/core';
import {
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonIcon,
} from '@ionic/angular/standalone';
import { UsuarioConPwd, Usuario, UserPwd_Foto } from '../../../../shared/types/usuario';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';
import { Departamento } from '../../../../shared/types/departamentos';
import { MainStore } from '../../../../shared/stores/main.store';
import { FormsModule } from '@angular/forms';
import { FotoComponent } from '../../../../shared/components/foto/foto.component';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss'],
  imports: [
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    FormsModule,
    IonIcon,
    FotoComponent,
  ],
})
export class UsuariosFormComponent {
  private mainStore = inject(MainStore);
  private departamentoService = inject(DepartamentosService);

  public departamentos = resource({
    loader: () => this.departamentoService.getDepartamentos(),
  });

  buttonMSG = input<string>('Crear cuenta');
  isAdmin = this.mainStore.isAdmin;

  public user = input<Usuario>({
    email: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    is_admin: false,
    id_departamento: 1,
    nro_documento: '',
    id_usuario: 0,
    foto_url: '',
    reputacion: 0,
    articulos_carrito: [],
  });

  isLoggedUser = computed(() =>
    this.user().id_usuario !== 0 ? this.mainStore.isUserLogged(this.user().id_usuario) : true
  );
  passReq = computed(() => this.user().id_usuario === 0);

  password = signal<string>('');
  passwordRepeat = signal<string>('');

  passwordsDontCheck = computed(() => {
    return this.password() !== this.passwordRepeat();
  });

  public saved = output<UserPwd_Foto>();

  async handleClick(event: any) {
    const pwdUser = {
      email: this.user().email,
      nombres: this.user().nombres,
      apellidos: this.user().apellidos,
      direccion: this.user().direccion,
      is_admin: this.user().is_admin,
      id_departamento: this.user().id_departamento,
      nro_documento: this.user().nro_documento,
      password: this.password(),
    };

    this.saved.emit({ pwdUser: pwdUser, foto: this.foto });
  }

  public foto?: File;

  async savePhoto(fotoWebPath: string) {
    this.user().foto_url = fotoWebPath;
    console.log({ fotoWebPath });
    try {
      const response = await fetch(fotoWebPath);
      const blob = await response.blob();

      this.foto = new File([blob], `${this.user().nombres + this.user().apellidos}.jpg`, {
        type: blob.type || 'image/jpeg',
      });
    } catch (e) {
      throw new Error('Error al tomar una foto');
    }
  }
}
