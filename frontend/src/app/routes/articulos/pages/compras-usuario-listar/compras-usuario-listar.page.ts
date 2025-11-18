import { Component, effect, inject, resource, signal } from '@angular/core';
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
import { ComprasService } from '../../../../shared/services/compras.service';
import { ArticulosService } from '../../../../shared/services/articulos.service';

@Component({
  selector: 'app-compras-usuario-listar',
  imports: [IonCard, IonCardTitle, IonGrid, IonRow, IonCol],
  templateUrl: './compras-usuario-listar.page.html',
  styleUrl: './compras-usuario-listar.page.css',
})
export class ComprasUsuarioListarPage {
  private mainStore = inject(MainStore);
  private comprasService = inject(ComprasService);
  private articulosService = inject(ArticulosService);

  public listadoArticulos = signal<any[]>([]);

  public articulosComprados = resource({
    loader: () => this.comprasService.getComprasByUserId(Number(this.mainStore.user()?.id_usuario)),
  });

  private cargarArticulosComprados = effect(async () => {
    const compras = this.articulosComprados.value();

    if (!compras) return;

    if (compras.length === 0) {
      this.listadoArticulos.set([]);
      return;
    }

    const ids = compras.map((c) => String(c.id_articulo));

    const articulos = await Promise.all(ids.map((id) => this.articulosService.getArticuloId(id)));

    this.listadoArticulos.set(articulos);
  });

  // public listadoArticulos = resource.from(this.articulosComprados, {
  //   loader: async ({ value }) => {
  //     if (!value) return [];

  //     const comprasViejas = value.map((compra:any) => this.articulosService.getArticuloId(String(compra.id_articulo));

  //     return Promise.all(comprasViejas);
  //   },
  // });
}
