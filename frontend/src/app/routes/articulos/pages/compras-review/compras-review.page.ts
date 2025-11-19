import { Component, computed, inject, input, output, resource, signal } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { ReseniaPost } from '../../../../shared/types/resenia';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonButton, IonInput } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { MainStore } from '../../../../shared/stores/main.store';

@Component({
  selector: 'app-compras-review',
  imports: [FormsModule, IonIcon, IonButton, IonInput],
  templateUrl: './compras-review.page.html',
  styleUrl: './compras-review.page.css',
})
export class ComprasReviewPage {
  private articuloService = inject(ArticulosService);
  private usuarioService = inject(UsuariosService);
  private mainStore = inject(MainStore);
  private route = inject(ActivatedRoute);

  private params = toSignal(this.route.paramMap);

  public idCompra = signal<number | null>(null);

  private idArticulo = computed(() => this.params()?.get('id_articulo') ?? null);

  public articuloComprado = resource({
    loader: () => this.articuloService.getArticuloId(String(this.idArticulo())),
  });

  public comentario = '';
  public reputacion = 0;

  public reseniaForm = signal<ReseniaPost>({
    id_vendedor: 1,
    id_articulo: 1,
    comentario: 'Hola frontend!',
    reputacion: 3,
  });

  handleClick(event: any) {
    const reseniaExport = {
      id_vendedor: Number(this.articuloComprado.value()?.id_vendedor),
      comentario: this.reseniaForm().comentario, //comentarioInput.value,
      reputacion: this.reseniaForm().reputacion, //Number(reputacionInput.value),
      id_articulo: Number(this.idArticulo()),
    };
    this.usuarioService.postResenia(
      Number(this.mainStore.user()?.id_usuario),
      Number(this.idCompra()),
      reseniaExport
    );
  }

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const id = Number(params['id_compra'] ?? NaN);
      this.idCompra.set(id);
    });
  }
}
