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
  IonButton,
  IonRouterLinkWithHref,
  IonIcon,
} from '@ionic/angular/standalone';
import { ComprasService } from '../../../../shared/services/compras.service';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras-usuario-listar',
  imports: [IonButton, IonIcon],
  templateUrl: './compras-usuario-listar.page.html',
  styleUrl: './compras-usuario-listar.page.css',
})
export class ComprasUsuarioListarPage {
  private router = inject(Router);
  private mainStore = inject(MainStore);
  private comprasService = inject(ComprasService);
  private articulosService = inject(ArticulosService);

  public id_UsuarioLog = this.mainStore.user()?.id_usuario;

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

    const articulos = await Promise.all(
      compras.map((c) => this.articulosService.getArticuloId(String(c.id_articulo)))
    );

    const mixArtComp = compras.map((compra, index) => ({ compra, articulo: articulos[index] }));
    this.listadoArticulos.set(mixArtComp);
  });

  handleReview(idArticulo: number, idCompra: number) {
    this.router.navigate([`cuenta/compras/${idArticulo}/review`], {
      queryParams: { id_compra: idCompra },
    });
  }

  handleVendedor(id: number) {
    this.router.navigate([`usuarios/${id}`]);
  }
}
