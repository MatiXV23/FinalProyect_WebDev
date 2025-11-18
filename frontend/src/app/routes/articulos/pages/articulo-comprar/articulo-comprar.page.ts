import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MainStore } from '../../../../shared/stores/main.store';
import { IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';

@Component({
  selector: 'app-articulo-comprar',
  imports: [IonInput, FormsModule],
  templateUrl: './articulo-comprar.page.html',
  styleUrl: './articulo-comprar.page.css',
})
export class ArticuloComprarPage {
  private router = inject(Router);
  private mainStore = inject(MainStore);
  private articulosService = inject(ArticulosService);
  private usuarioService = inject(UsuariosService);

  public articulosActuales = this.mainStore.articuloCompraActual;
  id_articuloActual = this.mainStore.articuloCompraActual?.id_articulo;
  producto = this.articulosActuales?.nombre;
  precio = this.articulosActuales?.precio;

  tarjeta = '';
  expira = '';
  cvv = '';

  procesarPago() {
    if (!this.tarjeta || !this.expira || !this.cvv) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setTimeout(() => {
      alert('Pago simulado completado correctamente 🎉');
      this.articulosService.deleteArticulo(Number(this.id_articuloActual));
      this.usuarioService.postCompraUsuario(
        Number(this.mainStore.user()?.id_usuario),
        this.articulosActuales
      );
      this.mainStore.articuloCompraActual = undefined;
      this.router.navigate(['/home']);
    }, 500);
  }
}
