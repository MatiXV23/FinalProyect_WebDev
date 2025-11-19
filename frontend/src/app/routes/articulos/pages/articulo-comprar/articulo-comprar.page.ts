import { Component, computed, inject, input, resource } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainStore } from '../../../../shared/stores/main.store';
import { IonInput, IonIcon, IonButton, IonAlert } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { Articulo } from '../../../../shared/types/articulos';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-articulo-comprar',
  imports: [IonInput, FormsModule, IonIcon, IonButton, IonAlert],
  templateUrl: './articulo-comprar.page.html',
  styleUrl: './articulo-comprar.page.css',
})
export class ArticuloComprarPage {
  private router = inject(Router);
  private mainStore = inject(MainStore);
  private articulosService = inject(ArticulosService);
  private usuarioService = inject(UsuariosService);
  private userService = inject(UsuariosService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  public ids_articulos: number[] = [];

  articulos = resource({
    loader: () =>
      Promise.all(this.ids_articulos.map((id) => this.articulosService.getArticuloId(String(id)))),
  });

  totalUYU = computed(() => {
    let total = 0;
    this.articulos.value()?.forEach((a: Articulo) => (total += a.moneda === 'UYU' ? a.precio : 0));
    return total;
  });

  totalUSD = computed(() => {
    let total = 0;
    this.articulos.value()?.forEach((a: Articulo) => (total += a.moneda === 'USD' ? a.precio : 0));
    return total;
  });

  tarjeta = '';
  expira = '';
  cvv = '';
  alertButtons = [
    {
      text: 'Volver',
      handler: () => this.router.navigate(['/home']),
    },
  ];

  isDisable() {
    return !this.tarjeta || !this.expira || !this.cvv;
  }

  async procesarPago() {
    if (this.isDisable()) {
      return;
    }

    if (!this.articulos.hasValue()) return;

    await Promise.all(
      this.ids_articulos.map((id) =>
        this.userService.comprarArticulo(this.mainStore.user()!.id_usuario, id)
      )
    );

    this.authService.getUser();
  }

  formatExpiry(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }

    this.expira = value.slice(0, 5);
  }

  constructor() {
    this.route.queryParams.subscribe((params: any) => {
      this.ids_articulos = params['ids_articulos']
        ? String(params['ids_articulos']).split(',').map(Number)
        : [];
    });
  }
}
