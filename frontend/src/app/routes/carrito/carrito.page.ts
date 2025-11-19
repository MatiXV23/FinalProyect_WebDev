import { Component, computed, effect, inject, OnInit, resource } from '@angular/core';
import { IonIcon, IonButton } from "@ionic/angular/standalone";
import { Articulo } from '../../shared/types/articulos';
import { MainStore } from '../../shared/stores/main.store';
import { ArticulosService } from '../../shared/services/articulos.service';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { AuthService } from '../../shared/services/auth.service';
import { WebsocketService } from '../../shared/services/websocket.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  imports: [IonIcon, IonButton, RouterLink],
})
export class CarritoPage  {
  private mainStore = inject(MainStore)
  private articulosService = inject(ArticulosService)
  private usuariosService = inject(UsuariosService)
  private webSocketService =  inject(WebsocketService)
  private router = inject(Router)

  user = this.mainStore.user

  totalUYU = computed(() => {
    let total = 0
    this.articulos_carrito.value()?.forEach((a: Articulo)=> total += a.moneda === 'UYU' ? a.precio : 0)
    return total
  })

  totalUSD = computed(() => {
    let total = 0
    this.articulos_carrito.value()?.forEach((a: Articulo)=> total += a.moneda === 'USD' ? a.precio : 0)
    return total
  })

  async removeItem(id_articulo: number) {
    let articulos_carrito = this.user()!.articulos_carrito

    articulos_carrito.splice(articulos_carrito.findIndex((a)=>a === id_articulo), 1)
    await this.usuariosService.updateCarrito(this.user()!.id_usuario, articulos_carrito)
  }

  carritoReload = effect(()=> {
    if (this.webSocketService.shouldCarritoReload()) {
      this.articulos_carrito.reload()
      this.webSocketService.shouldCarritoReload.set(false)
    }
  })


  articulos_carrito = resource({
    loader: () => this.getAllCartArticulos()
  })

  async getAllCartArticulos() {
    return await Promise.all(this.user()!.articulos_carrito.map(id_articulo => this.articulosService.getArticuloId(String(id_articulo))))
  }

  navComprarForm(){
    this.router.navigate(['carrito', 'comprar'], { 
      queryParams: { ids_articulos: this.articulos_carrito.value()?.map((a)=> a.id_articulo) } 
    });
  }

  

}
