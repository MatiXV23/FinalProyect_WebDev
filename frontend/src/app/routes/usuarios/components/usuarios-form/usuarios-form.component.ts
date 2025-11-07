import { Component, inject, input, OnInit, output, resource } from '@angular/core';
import {
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { UsuarioConPwd, Usuario } from '../../../../shared/types/usuario';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';
import { Departamento } from '../../../../shared/types/departamentos';
import { MainStore } from '../../../../shared/stores/main.store';
import { FormsModule } from '@angular/forms';

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

  password: string = ''


  public saved = output<UsuarioConPwd>();

  async handleClick(event: any) {
    const userExp = {
      email: this.user().email,
      nombres: this.user().nombres,
      apellidos: this.user().apellidos,
      direccion: this.user().direccion,
      is_admin: this.user().is_admin,
      id_departamento: this.user().id_departamento,
      nro_documento: this.user().nro_documento,
      password: this.password,
    }

    this.saved.emit(userExp);
  }
}
