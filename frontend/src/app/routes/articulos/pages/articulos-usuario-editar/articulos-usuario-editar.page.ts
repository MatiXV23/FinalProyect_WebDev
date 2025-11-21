import { Component, computed, inject, resource } from '@angular/core';
import { ArticuloFormComponent } from '../../components/articulo-form/articulo-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { ArticuloPost, ArticuloPostFoto, MonedaEnum } from '../../../../shared/types/articulos';
import { IonIcon } from '@ionic/angular/standalone';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-articulos-usuario-editar',
  imports: [ArticuloFormComponent, IonIcon],
  templateUrl: './articulos-usuario-editar.page.html',
  styleUrl: './articulos-usuario-editar.page.css',
})
export class ArticulosUsuarioEditarPage {
  private articulosService = inject(ArticulosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  articulo = resource({
    params: () => ({ id: this.route.snapshot.paramMap.get('id_articulo') }),
    loader: ({ params }) => {
      return this.articulosService.getArticuloId(String(params.id));
    },
  });

  async handleEdit(articuloPostFoto: ArticuloPostFoto) {
    const { foto, articulo } = articuloPostFoto;

    try {
      if (this.articulo.hasValue()) {
        const id = this.articulo.value().id_articulo;

        if (foto) await this.articulosService.updateArticuloFoto(id, foto);
        await this.articulosService.putArticulo(id, {
          ...articulo,
          id_articulo: id,
        });

        this.notificationService.showSuccess('Articulo editado correctamente', 1000);
        this.router.navigate(['/home']);
      }
    } catch (e: any) {
      throw e.message;
    }
  }
}
