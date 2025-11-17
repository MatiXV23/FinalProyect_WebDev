import { Component, effect, inject, resource } from '@angular/core';
import {
  IonCard,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/angular/standalone';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { MainStore } from '../../../../shared/stores/main.store';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articulos-usuario-listar',
  imports: [IonCard, IonCardTitle, IonGrid, IonRow, IonCol, IonButton, RouterLink],
  templateUrl: './articulos-usuario-listar.page.html',
  styleUrl: './articulos-usuario-listar.page.css',
})
export class ArticulosUsuarioListarPage {
  private artService = inject(ArticulosService);
  private mainStore = inject(MainStore);
  private idUser = this.mainStore.user()?.id_usuario;
  articulos = resource({
    loader: () => this.artService.getAll({ id_vendedor: this.idUser }),
  });
  handleDelete(id: number) {
    this.artService.deleteArticulo(id);
    this.articulos.reload();
  }
}
