import { Component, inject, resource } from '@angular/core';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { IonCard, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-articulo-listar',
  imports: [IonCard, IonCardTitle, IonCardSubtitle],
  templateUrl: './articulo-listar.page.html',
  styleUrl: './articulo-listar.page.css',
})
export class ArticuloListarPage {
  private articulosService = inject(ArticulosService)

  articulos = resource({
    loader: () => this.articulosService.getAll({id_vendedor: 1})
  })
}
