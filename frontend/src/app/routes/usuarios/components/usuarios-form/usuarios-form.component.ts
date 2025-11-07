import { Component, inject, input, OnInit, output } from '@angular/core';
import {
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { UsuarioSinId } from '../../../../shared/types/usuario';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';
import { Departamento } from '../../../../shared/types/departamentos';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss'],
  imports: [IonInput, IonInputPasswordToggle, IonButton, IonSelect, IonSelectOption, IonCheckbox],
})
export class UsuariosFormComponent implements OnInit {
  private departamentoService = inject(DepartamentosService);
  public departamentos: Departamento[] = [];
  public user = input<UsuarioSinId>({
    email: 'artigas@ucu.edu.uy',
    nombres: 'Jose Gervacio',
    apellidos: 'Artigas Artgias',
    direccion: 'calle abc',
    is_admin: false,
    id_departamento: 1,
    nro_documento: '12345678',
    foto_url: 'foto.png',
    password: 'pass',
  });
  public saved = output<UsuarioSinId>();

  async ngOnInit() {
    this.departamentos = await this.departamentoService.getDepartamentos();
  }
  async handleClick(event: any) {
    this.saved.emit(this.user());
  }
}
