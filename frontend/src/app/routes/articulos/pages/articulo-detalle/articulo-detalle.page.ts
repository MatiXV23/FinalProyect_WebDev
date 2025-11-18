import { Component, computed, inject, input, resource } from '@angular/core';
import { IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonBackButton, IonRouterLinkWithHref, IonIcon } from '@ionic/angular/standalone';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MainStore } from '../../../../shared/stores/main.store';
import { ChatsService } from '../../../../shared/services/chats.service';
import { addIcons } from 'ionicons';
import { bicycle, home, location, documentText, cube, ribbon, chatbubbles, person, cart, flash, shieldCheckmark } from 'ionicons/icons';
import { UsuariosService } from '../../../../shared/services/usuarios.service';

@Component({
  selector: 'app-articulo-detalle',
  imports: [
    IonButton,
    IonRouterLinkWithHref,
    RouterLink,
    IonIcon
],
  templateUrl: './articulo-detalle.page.html',
  styleUrl: './articulo-detalle.page.css',
})
export class ArticuloDetallePage {

  private articulosService = inject(ArticulosService);
  private usuariosService = inject(UsuariosService)
  private mainStore = inject(MainStore)
  private chatsService = inject(ChatsService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user = this.mainStore.user

  articulo = resource({
    params: () => ({ id: this.route.snapshot.paramMap.get('id_articulo') }),
    loader: ({ params }) => {
      return this.articulosService.getArticuloId(String(params.id));
    },
  });
  
  disabled = computed(()=>  this.articulo.value()?.id_vendedor === this.user()?.id_usuario)
  inCarrito = computed(()=> Boolean(this.mainStore.user()!.articulos_carrito.find((a) => a === this.articulo.value()!.id_articulo)))

  async handleChatBtn(event: any, id_vendedor: number){ 
    const chatId = await this.getChatId(id_vendedor)

    if (!chatId) return //TODO: ver que hacer en estos casos en los que el usuario duenio pulsa el btn

    this.router.navigate(['/chats', chatId])
  }

  async getChatId(id_vendedor: number){
    const user = this.mainStore.user()
    if (!user) this.router.navigate(['/login'])
    
    if (user?.id_usuario === id_vendedor) return

    const chatId = await this.chatsService.getChatId(user!.id_usuario, id_vendedor)

    return chatId
  }


  async agregarAlCarrito(id_articulo: number) {
    let articulos_carrito = this.mainStore.user()!.articulos_carrito

    if (articulos_carrito.find((a) => a === id_articulo)) return

    articulos_carrito.push(id_articulo)
    await this.usuariosService.updateCarrito(this.mainStore.user()!.id_usuario, articulos_carrito)
  }

  navComprar() {
    this.router.navigate(['comprar'])
  }

  constructor(){
    addIcons({bicycle, home, location, documentText, cube, ribbon, chatbubbles, person, cart, flash, shieldCheckmark})
  }
}
