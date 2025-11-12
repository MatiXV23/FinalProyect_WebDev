import { Component, computed, inject, resource } from '@angular/core';
import { ArticuloFormComponent } from '../../components/articulo-form/articulo-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { ArticuloPost, MonedaEnum } from '../../../../shared/types/articulos';

@Component({
  selector: 'app-articulos-usuario-editar',
  imports: [ArticuloFormComponent],
  templateUrl: './articulos-usuario-editar.page.html',
  styleUrl: './articulos-usuario-editar.page.css',
})
export class ArticulosUsuarioEditarPage {
  private articulosService = inject(ArticulosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  articulo = resource({
    params: () => ({ id: this.route.snapshot.paramMap.get('id_articulo') }),
    loader: ({ params }) => {
      return this.articulosService.getArticuloId(String(params.id));
    },
  });

  async handleEdit(articuloEditClick: ArticuloPost) {
    console.log('PUT EDITAR ARTICULO');

    try {
      if (this.articulo.hasValue()) await this.articulosService.putArticulo(this.articulo.value());
      this.router.navigate(['/home']);
    } catch (e: any) {
      throw e.message;
    }
  }
}
