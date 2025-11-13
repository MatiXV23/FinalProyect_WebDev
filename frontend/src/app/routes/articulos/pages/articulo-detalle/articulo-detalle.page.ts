import { Component, inject, input, resource } from '@angular/core';
import {
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonBackButton,
  IonRouterLinkWithHref,
} from '@ionic/angular/standalone';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-articulo-detalle',
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonRouterLinkWithHref,
    RouterLink,
  ],
  templateUrl: './articulo-detalle.page.html',
  styleUrl: './articulo-detalle.page.css',
})
export class ArticuloDetallePage {
  private articulosService = inject(ArticulosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  articulo = resource({
    params: () => ({ id: this.route.snapshot.paramMap.get('id_articulo') }),
    loader: ({ params }) => {
      return this.articulosService.getArticuloId(String(params.id));
    },
  });
  async handleCarrito() {
    console.log('Articulo en el carrito!');
  }
}
