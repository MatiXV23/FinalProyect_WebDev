import { Component, inject } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ArticuloFormComponent } from '../../components/articulo-form/articulo-form.component';
import { ArticuloPost } from '../../../../shared/types/articulos';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articulo-crear',
  imports: [ FormsModule,  ArticuloFormComponent, IonIcon],
  templateUrl: './articulo-crear.page.html',
  styleUrl: './articulo-crear.page.css',
})
export class ArticuloCrearPage {
  private articuloService = inject(ArticulosService);

  private router = inject(Router);

  async handlePostear(Articulo: ArticuloPost) {
    try {
      const newArticulo = await this.articuloService.postArticulo(Articulo);
      this.router.navigate(['/home']);
    } catch (e) {
      throw e;
    }
  }

}
