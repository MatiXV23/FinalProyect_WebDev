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
import { MainStore } from '../../../../shared/stores/main.store';
import { ChatsService } from '../../../../shared/services/chats.service';
import { Articulo } from '../../../../shared/types/articulos';

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
  private mainStore = inject(MainStore);
  private chatsService = inject(ChatsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  articulo = resource({
    params: () => ({ id: this.route.snapshot.paramMap.get('id_articulo') }),
    loader: ({ params }) => {
      return this.articulosService.getArticuloId(String(params.id));
    },
  });

  async handleCompra(articulo: Articulo) {
    this.mainStore.articuloCompraActual = articulo;
    console.log(this.mainStore.articuloCompraActual);
    this.router.navigate([`/articulos/${articulo.id_articulo}/comprar`]);
  }

  async handleChatBtn(event: any, id_vendedor: number) {
    const chatId = await this.getChatId(id_vendedor);

    if (!chatId) return; //TODO: ver que hacer en estos casos en los que el usuario duenio pulsa el btn

    this.router.navigate(['/chats', chatId]);
  }

  async getChatId(id_vendedor: number) {
    const user = this.mainStore.user();
    if (!user) this.router.navigate(['/login']);

    if (user?.id_usuario === id_vendedor) return;

    const chatId = await this.chatsService.getChatId(user!.id_usuario, id_vendedor);

    return chatId;
  }

  async handleCarrito() {
    console.log('Articulo en el carrito!');
  }
}
