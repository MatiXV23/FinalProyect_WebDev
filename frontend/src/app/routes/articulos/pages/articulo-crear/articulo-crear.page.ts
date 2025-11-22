import { Component, inject } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ArticuloFormComponent } from '../../components/articulo-form/articulo-form.component';
import { ArticuloPost, ArticuloPostFoto } from '../../../../shared/types/articulos';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-articulo-crear',
  imports: [FormsModule, ArticuloFormComponent, IonIcon],
  templateUrl: './articulo-crear.page.html',
  styleUrl: './articulo-crear.page.css',
})
export class ArticuloCrearPage {
  private articuloService = inject(ArticulosService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  async handlePostear2(Articulo: ArticuloPost) {
    try {
      const newArticulo = await this.articuloService.postArticulo(Articulo);
      this.router.navigate(['/home']);
    } catch (e) {
      throw e;
    }
  }

  async handlePostear(articuloPostFoto: ArticuloPostFoto) {
    const { foto, articulo } = articuloPostFoto;

    try {
      const art = await this.articuloService.postArticulo(articulo);
      if (foto) await this.articuloService.updateArticuloFoto(art.id_articulo, foto);

      this.notificationService.showSuccess('Articulo creado correctamente', 1000);
      this.router.navigate(['/home']);
    } catch (e: any) {
      throw e.message;
    }
  }
}
