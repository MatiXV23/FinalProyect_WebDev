import { Component, effect, inject, OnInit, resource, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MainStore } from '../../../../shared/stores/main.store';
import { ComprasService } from '../../../../shared/services/compras.service';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Compras } from '../../../../shared/types/compras';
import { Articulo } from '../../../../shared/types/articulos';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { GridNavComponent } from '../../../../shared/components/grid-nav/grid-nav.component';

@Component({
  selector: 'app-ventas-usuario-listar',
  templateUrl: './ventas-usuario-listar.page.html',
  styleUrls: ['./ventas-usuario-listar.page.scss'],
  imports: [IonIcon, IonButton, RouterLink, GridNavComponent],
})
export class VentasUsuarioListarPage {
  private router = inject(Router);
  private mainStore = inject(MainStore);
  private usuariosService = inject(UsuariosService);
  private articulosService = inject(ArticulosService);

  public ventas = signal<{ compra: Compras; articulo: Articulo }[]>([]);

  public ventasTotales = resource({
    loader: () => this.usuariosService.getVentasByUserId(this.mainStore.user()!.id_usuario),
  });

  ventasPorPagina = 6;
  paginaActual = signal(1);
  paginatedVentas = signal<Compras[]>([]);

  setpaginatedVentas(paginatedVentas: Compras[]) {
    this.paginatedVentas.set(paginatedVentas);
  }

  private cargarVentas = effect(async () => {
    const ventas = this.paginatedVentas();
    if (!ventas) return;

    if (ventas.length === 0) {
      this.ventas.set([]);
      return;
    }

    const articulos = await Promise.all(
      ventas.map((c) => this.articulosService.getArticuloId(String(c.id_articulo)))
    );

    const mixArtComp = ventas.map((compra, index) => ({ compra, articulo: articulos[index] }));
    this.ventas.set(mixArtComp);
  });

  handleComprador(idComprador: number) {
    this.router.navigate([`/usuarios/${idComprador}`]);
  }
}
