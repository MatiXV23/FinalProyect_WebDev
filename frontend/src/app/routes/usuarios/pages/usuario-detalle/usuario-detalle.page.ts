import { Component, computed, inject, resource } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonButton, IonCard, IonRouterLinkWithHref, IonAvatar, IonList, IonContent, IonLabel, IonItem } from "@ionic/angular/standalone";
import { MainStore } from '../../../../shared/stores/main.store';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';

@Component({
  selector: 'app-usuario-detalle',
  imports: [RouterLink, IonButton, IonList, IonLabel, IonItem, IonCard],
  templateUrl: './usuario-detalle.page.html',
  styleUrl: './usuario-detalle.page.css',
})
export class UsuarioDetallePage {
  private mainStore = inject(MainStore);
  private usuariosService = inject(UsuariosService);
  private depService = inject(DepartamentosService);
  private route = inject(ActivatedRoute);
  
  private params = toSignal(this.route.paramMap);
  id_usuario = computed(() => this.params()?.get('id_usuario') ?? null);

  loggedUser = this.mainStore.user

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
  
  resenias = resource({
    params: () => ({ id: this.id_usuario() }),
    loader: ({ params }) => {
      if (!params.id)
        return this.usuariosService.getUserResenias(String(this.mainStore.user()?.id_usuario));
      return this.usuariosService.getUserResenias(params.id);
    },
  })
}
