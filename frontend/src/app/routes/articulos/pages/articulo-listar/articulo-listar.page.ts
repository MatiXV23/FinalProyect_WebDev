import { Component, effect, inject, resource, signal, computed } from '@angular/core';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import {
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonSelectOption,
  IonSelect,
  IonSearchbar,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';
import { MainStore } from '../../../../shared/stores/main.store';
import { RouterLink } from '@angular/router';
import { GridNavComponent } from '../../../../shared/components/grid-nav/grid-nav.component';
import { Articulo } from '../../../../shared/types/articulos';

@Component({
  selector: 'app-articulo-listar',
  imports: [
    IonSelectOption,
    IonSelect,
    GridNavComponent,
    FormsModule,
    IonSearchbar,
    RouterLink,
    IonIcon,
    IonButton,
  ],
  templateUrl: './articulo-listar.page.html',
  styleUrl: './articulo-listar.page.css',
})
export class ArticuloListarPage {
  private articulosService = inject(ArticulosService);
  private departamentoService = inject(DepartamentosService);
  private mainStore = inject(MainStore);

  user = this.mainStore.user();

  params: Record<string, any> = {
    nombre: null,
    id_vendedor: null,
    id_categoria: null,
    id_departamento: this.user?.id_departamento || null,
  };

  public departamentos = resource({
    loader: () => this.departamentoService.getDepartamentos(),
  });

  public categorias = resource({
    loader: () => this.articulosService.getCategorias(),
  });

  articulos = resource({
    loader: () => this.articulosService.getAll(this.params),
  });

  articulosPorPagina = 12;
  paginaActual = signal(1);
  paginatedArticulos = signal<Articulo[]>([]);

  setpaginatedArticulos(paginatedArticulos: Articulo[]) {
    this.paginatedArticulos.set(paginatedArticulos);
  }

  recargarArticulos() {
    this.paginaActual.set(1);
    this.articulos.reload();
  }

  resetFilters() {
    for (const param in this.params) {
      this.params[param] = null;
    }
    this.recargarArticulos();
  }

  range(n: number) {
    const range = [];
    for (let i = 0; i < n; i++) range.push(i);
    return range;
  }
}
