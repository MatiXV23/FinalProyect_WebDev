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

@Component({
  selector: 'app-ventas-usuario-listar',
  templateUrl: './ventas-usuario-listar.page.html',
  styleUrls: ['./ventas-usuario-listar.page.scss'],
  imports: [IonIcon, IonButton, RouterLink],
})
export class VentasUsuarioListarPage {
  private router = inject(Router);
  private mainStore = inject(MainStore);
  private usuariosService = inject(UsuariosService);

  public ventas = signal<{ compra: any; articulo: any }[]>([]);

  public ventasTotales = resource({
    loader: async () => {
      const idUser = this.mainStore.user()?.id_usuario;
      if (!idUser) return [];
      return this.usuariosService.getVentasByUserId(idUser);
    },
  });

  private cargarVentas = effect(() => {
    const data = this.ventasTotales.value();
    if (!data) return;

    this.ventas.set(data);
  });

  handleComprador(idComprador: number) {
    this.router.navigate([`/usuarios/${idComprador}`]);
  }
}
