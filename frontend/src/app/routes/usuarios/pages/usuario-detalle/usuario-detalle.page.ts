import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonRouterLinkWithHref,
  IonAvatar,
  IonList,
  IonContent,
  IonLabel,
  IonItem,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
  IonIcon,
} from '@ionic/angular/standalone';
import { MainStore } from '../../../../shared/stores/main.store';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { RatingStarComponent } from '../../../../shared/components/rating-star/rating-star.component';
import { ChatsService } from '../../../../shared/services/chats.service';

@Component({
  selector: 'app-usuario-detalle',
  imports: [RouterLink, IonButton, IonCard, RatingStarComponent, IonCardContent, IonIcon],
  templateUrl: './usuario-detalle.page.html',
  styleUrl: './usuario-detalle.page.css',
})
export class UsuarioDetallePage {
  private mainStore = inject(MainStore);
  private usuariosService = inject(UsuariosService);
  private chatsService = inject(ChatsService);
  private depService = inject(DepartamentosService);
  private route = inject(ActivatedRoute);
  private articuloService = inject(ArticulosService);
  private router = inject(Router);


  private params = toSignal(this.route.paramMap);
  id_usuario = computed(() => this.params()?.get('id_usuario') ?? null);

  loggedUser = this.mainStore.user;

  resenias = resource({
    params: () => ({ id: this.id_usuario() }),
    loader: ({ params }) => {
      if (!params.id)
        return this.usuariosService.getUserResenias(String(this.mainStore.user()?.id_usuario));
      return this.usuariosService.getUserResenias(params.id);
    },
  });

  user = resource({
    params: () => ({ id: this.id_usuario() }),
    loader: ({ params }) => {
      if (!params.id)
        return this.usuariosService.getUserById(String(this.mainStore.user()?.id_usuario));
      return this.usuariosService.getUserById(params.id);
    },
  });

  dptos = resource({
    loader: () => this.depService.getDepartamentos(),
  });
  dptoName = computed(() => {
    if (this.dptos.hasValue()) {
      return this.dptos
        .value()
        .find((c) => c.id_departamento === this.user.value()!.id_departamento)?.nombre;
    }
    return;
  });

  articulosName = signal<Map<number, string>>(new Map());

  artEff = effect(async () => {
    const resenias = this.resenias.value();
    if (!resenias) return;

    const map = new Map<number, string>();

    await Promise.all(
      resenias.map(async (res) => {
        const nombre = await this.getArticuloName(res.id_articulo);
        map.set(res.id_articulo, nombre);
      })
    );

    this.articulosName.set(map);
  });
  async getArticuloName(id_articulo: number): Promise<string> {
    return (await this.articuloService.getArticuloId(String(id_articulo))).nombre;
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
}
