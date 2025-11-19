import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonButton, IonCard, IonRouterLinkWithHref, IonAvatar, IonList, IonContent, IonLabel, IonItem, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonIcon } from "@ionic/angular/standalone";
import { MainStore } from '../../../../shared/stores/main.store';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { RatingStarComponent } from '../../components/rating-star/rating-star.component';

@Component({
  selector: 'app-usuario-detalle',
  imports: [RouterLink, IonButton, IonCard, RatingStarComponent, IonCardContent, IonIcon],
  templateUrl: './usuario-detalle.page.html',
  styleUrl: './usuario-detalle.page.css',
})
export class UsuarioDetallePage {
  private mainStore = inject(MainStore);
  private usuariosService = inject(UsuariosService);
  private depService = inject(DepartamentosService);
  private route = inject(ActivatedRoute);
  private articuloService = inject(ArticulosService)
  
  private params = toSignal(this.route.paramMap);
  id_usuario = computed(() => this.params()?.get('id_usuario') ?? null);

  loggedUser = this.mainStore.user

  resenias = resource({
    params: () => ({ id: this.id_usuario() }),
    loader: ({ params }) => {
      if (!params.id)
        return this.usuariosService.getUserResenias(String(this.mainStore.user()?.id_usuario));
      return this.usuariosService.getUserResenias(params.id);
    },
  })

  user = resource({
    params: () => ({ id: this.id_usuario() }),
    loader: ({ params }) => {
      if (!params.id)
        return this.usuariosService.getUserById(String(this.mainStore.user()?.id_usuario));
      return this.usuariosService.getUserById(params.id);
    },
  });

  dptos = resource({
    loader: () => this.depService.getDepartamentos()
  })
  dptoName = computed(()=>{
    if (this.dptos.hasValue()) {
      return this.dptos.value().find((c)=>c.id_departamento === this.user.value()!.id_departamento)?.nombre
    }
    return
  })
  
 
  
  articulosName = signal<Map<number, string>>(new Map());

  artEff = effect(async ()=> {
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
  })
  async getArticuloName(id_articulo: number): Promise<string> {
    return (await this.articuloService.getArticuloId(String(id_articulo))).nombre
  }
}
