import { Component, effect, inject, resource, signal } from '@angular/core';
import {
  IonCard,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { MainStore } from '../../../../shared/stores/main.store';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Articulo } from '../../../../shared/types/articulos';
import { GridNavComponent } from '../../../../shared/components/grid-nav/grid-nav.component';

@Component({
  selector: 'app-articulos-usuario-listar',
  imports: [IonButton, RouterLink, IonIcon, GridNavComponent],
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

  articulosPorPagina = 6;
  paginaActual = signal(1);
  paginatedArticulos = signal<Articulo[]>([]);

  setpaginatedArticulos(paginatedArticulos: Articulo[]) {
    this.paginatedArticulos.set(paginatedArticulos);
  }

  handleDelete(id: number) {
    this.artService.deleteArticulo(id);
    this.articulos.reload();
  }
}
