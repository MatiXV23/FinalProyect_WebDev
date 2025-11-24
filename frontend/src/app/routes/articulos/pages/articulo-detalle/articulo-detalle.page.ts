import { Component, computed, inject, input, resource } from '@angular/core';
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
  IonIcon,
} from '@ionic/angular/standalone';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MainStore } from '../../../../shared/stores/main.store';
import { ChatsService } from '../../../../shared/services/chats.service';
import { Articulo } from '../../../../shared/types/articulos';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-articulo-detalle',
  imports: [IonButton, IonRouterLinkWithHref, RouterLink, IonIcon],
  templateUrl: './articulo-detalle.page.html',
  styleUrl: './articulo-detalle.page.css',
})
export class ArticuloDetallePage {
  private articulosService = inject(ArticulosService);
  private mainStore = inject(MainStore);
  private chatsService = inject(ChatsService);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user = this.mainStore.user;

  private params = toSignal(this.route.paramMap);
  id_articulo = computed(() => this.params()?.get('id_articulo') ?? null);

  articulo = resource({
    params: () => ({ id: this.id_articulo() }),
    loader: ({ params }) => {
      return this.articulosService.getArticuloId(String(params.id));
    },
  });

  disabled = computed(() => this.articulo.value()?.id_vendedor === this.user()?.id_usuario);
  inCarrito = computed(() =>
    Boolean(
      this.mainStore.user()!.articulos_carrito.find((a) => a === this.articulo.value()!.id_articulo)
    )
  );

  async handleCarrito() {
    console.log('Articulo agregado al carrito!');
  }

  async handleCompra(articulo: Articulo) {
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

  async agregarAlCarrito(id_articulo: number) {
    let articulos_carrito = this.mainStore.user()!.articulos_carrito;

    if (articulos_carrito.find((a) => a === id_articulo)) return;

    articulos_carrito.push(id_articulo);
    await this.usuariosService.updateCarrito(this.mainStore.user()!.id_usuario, articulos_carrito);
  }

  navComprar() {
    this.router.navigate(['articulos', this.id_articulo(), 'comprar'], { 
      queryParams: { ids_articulos: [this.id_articulo()] } 
    });
  }

  isUserLogged(id_vendedor: number) {
    return this.user()?.id_usuario === id_vendedor;
  }

}
