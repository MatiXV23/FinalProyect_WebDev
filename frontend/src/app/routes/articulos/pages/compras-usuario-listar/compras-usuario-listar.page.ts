import { Component, effect, inject, resource, signal } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { MainStore } from '../../../../shared/stores/main.store';
import {
  IonButton,
  IonIcon,
  IonModal,
} from '@ionic/angular/standalone';
import { ComprasService } from '../../../../shared/services/compras.service';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { Router, RouterLink } from '@angular/router';
import { Articulo } from '../../../../shared/types/articulos';
import { Compras } from '../../../../shared/types/compras';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-compras-usuario-listar',
  imports: [IonButton, IonIcon, IonModal, FormsModule, RouterLink],
  templateUrl: './compras-usuario-listar.page.html',
  styleUrl: './compras-usuario-listar.page.css',
})
export class ComprasUsuarioListarPage {
  private router = inject(Router);
  private mainStore = inject(MainStore);
  private comprasService = inject(ComprasService);
  private articulosService = inject(ArticulosService);
  private usuarioService = inject(UsuariosService);
  private notificationService = inject(NotificationService);

  public id_UsuarioLog = this.mainStore.user()?.id_usuario;

  public listadoArticulos = signal<{ compra: Compras; articulo: Articulo }[]>([]);

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

  handleVendedor(id: number) {
    this.router.navigate([`usuarios/${id}`]);
  }

  reseniaForm = {
    comentario: '',
    reputacion: 0,
    id_compra: 0,
  };

  isModalOpen = signal<boolean>(false);

  openModal(id_compra: number) {
    this.isModalOpen.set(true);
    this.reseniaForm.id_compra = id_compra;
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.reseniaForm = {
      comentario: '',
      reputacion: 0,
      id_compra: 0,
    };
  }
  setRating(rating: number) {
    this.reseniaForm.reputacion = rating;
  }

  async submitForm() {
    const { comentario, reputacion, id_compra } = this.reseniaForm;
    console.log({ res: this.reseniaForm });

    await this.usuarioService.postResenia(this.mainStore.user()!.id_usuario, id_compra, {
      comentario,
      reputacion,
    });

    this.articulosComprados.reload();
    this.closeModal();
    this.notificationService.showSuccess('Resenia publicada con exito!');
  }
}
