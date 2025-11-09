import { Component, inject, OnInit, resource } from '@angular/core';
import {
  IonInput,
  IonButton,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { MonedaEnum } from '../../../../shared/types/articulos';
import { MainStore } from '../../../../shared/stores/main.store';
import { CategoriasService } from '../../../../shared/services/categorias.service';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.scss'],
  imports: [IonInput, IonButton, IonCheckbox, IonSelect, IonSelectOption],
})
export class ArticuloFormComponent {
  private mainStore = inject(MainStore);

  public categoriasService = inject(CategoriasService);

  public moneda = MonedaEnum;

  public userLogged = this.mainStore.user()?.id_usuario;

  public totalCategorias = resource({
    loader: () => this.categoriasService.getCategorias(),
  });

  public async handleClick(event: any) {
    console.log('click publicar articulo');
  }
}
