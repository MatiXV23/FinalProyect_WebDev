import { Component, inject } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { ArticuloFormComponent } from '../../components/articulo-form/articulo-form.component';
import { ArticuloPost } from '../../../../shared/types/articulos';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articulo-crear',
  imports: [IonCard, FormsModule, IonCardHeader, IonCardTitle, ArticuloFormComponent],
  templateUrl: './articulo-crear.page.html',
  styleUrl: './articulo-crear.page.css',
})
export class ArticuloCrearPage {
  private articuloService = inject(ArticulosService);

  private router = inject(Router);
  // EN ESTE METODO ESTA PASANDO ALGUN ERROR
  async handlePostear(Articulo: ArticuloPost) {
    try {
      const newArticulo = await this.articuloService.postArticulo(Articulo);
      this.router.navigate(['home']);
    } catch (e) {
      throw e;
    }
  }
}
