import { Component, computed, inject, input, resource } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainStore } from '../../../../shared/stores/main.store';
import { IonInput, IonIcon, IonButton, IonAlert } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { addIcons } from 'ionicons'
import {   card,  cart,  lockClosed,  cardOutline,  calendarOutline,  shieldCheckmarkOutline,  shieldCheckmark,  checkmarkCircle,  informationCircle,  returnDownBack} from 'ionicons/icons';
import { Articulo } from '../../../../shared/types/articulos';
import { IonInputCustomEvent,InputInputEventDetail } from '@ionic/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-articulo-comprar',
  imports: [IonInput, FormsModule, IonIcon, IonButton, IonAlert],
  templateUrl: './articulo-comprar.page.html',
  styleUrl: './articulo-comprar.page.css',
})
export class ArticuloComprarPage {

  private router = inject(Router);
  private mainStore = inject(MainStore);
  private articulosService = inject(ArticulosService);
  private userService = inject(UsuariosService)
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService)

  public ids_articulos: number[] = [];

  articulos = resource({
    loader: () => Promise.all(this.ids_articulos.map(id => this.articulosService.getArticuloId(String(id))))
  }) 

  totalUYU = computed(() => {
    let total = 0
    this.articulos.value()?.forEach((a: Articulo)=> total += a.moneda === 'UYU' ? a.precio : 0)
    return total
  })

  totalUSD = computed(() => {
    let total = 0
    this.articulos.value()?.forEach((a: Articulo)=> total += a.moneda === 'USD' ? a.precio : 0)
    return total
  })

  tarjeta = '';
  expira = '';
  cvv = '';
  alertButtons = ['Action']

  async procesarPago() {
    if (!this.tarjeta || !this.expira || !this.cvv) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (!this.articulos.hasValue()) return

    await Promise.all(this.ids_articulos.map(id => this.userService.comprarArticulo(this.mainStore.user()!.id_usuario, id)));

    setTimeout(() => {
      this.authService.getUser()
      this.router.navigate(['/home']);
    }, 500);
  }

  formatExpiry(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }

    this.expira = value.slice(0, 5);
  }

  constructor() {
    addIcons({ 
      card, cart, lockClosed, cardOutline,
      calendarOutline, shieldCheckmarkOutline,
      shieldCheckmark, checkmarkCircle,
      informationCircle, returnDownBack
    });

    this.route.queryParams.subscribe((params: any) => {
      this.ids_articulos = params['ids_articulos'] 
        ? String(params['ids_articulos']).split(',').map(Number) 
        : [];
      
      console.log(this.ids_articulos);
    });
}
}
