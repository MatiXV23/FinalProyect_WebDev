import { Component, inject, resource } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { MainStore } from '../../../../shared/stores/main.store';
import {
  IonSelect,
  IonCard,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-compras-usuario-listar',
  imports: [IonCard, IonCardTitle, IonGrid, IonRow, IonCol],
  templateUrl: './compras-usuario-listar.page.html',
  styleUrl: './compras-usuario-listar.page.css',
})
export class ComprasUsuarioListarPage {
  private usuarioService = inject(UsuariosService);
  private mainStore = inject(MainStore);
  public compras = resource({
    loader: () => this.usuarioService.getComprasByIdUser(Number(this.mainStore.user()?.id_usuario)),
  });
}
