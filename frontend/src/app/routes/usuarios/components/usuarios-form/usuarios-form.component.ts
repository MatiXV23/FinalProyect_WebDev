import { Component, inject, input, OnInit, output, resource } from '@angular/core';
import {
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { UsuarioConPwd } from '../../../../shared/types/usuario';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';
import { Departamento } from '../../../../shared/types/departamentos';
import { MainStore } from '../../../../shared/stores/main.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss'],
  imports: [IonInput, IonInputPasswordToggle, IonButton, IonSelect, IonSelectOption, IonCheckbox, FormsModule],
})
export class UsuariosFormComponent {
  private mainStore = inject(MainStore)
  private departamentoService = inject(DepartamentosService);


  public departamentos = resource({
    loader: () => this.departamentoService.getDepartamentos()
  })

  buttonMSG = input<string>('Crear cuenta')
  isAdmin = this.mainStore.isAdmin

  public user = input<UsuarioConPwd>({
    email: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    is_admin: false,
    id_departamento: 1,
    nro_documento: '',
    foto_url: '',
    password: '',
  });

  public saved = output<UsuarioConPwd>();

  async handleClick(event: any) {
    this.saved.emit(this.user());
  }
}
