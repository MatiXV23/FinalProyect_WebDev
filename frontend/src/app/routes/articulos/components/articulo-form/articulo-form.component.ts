import { Component, effect, inject, input, OnInit, output, resource } from '@angular/core';
import { IonInput, IonButton, IonCheckbox, IonSelect, IonSelectOption, IonIcon } from '@ionic/angular/standalone';
import { ArticuloPost, MonedaEnum } from '../../../../shared/types/articulos';
import { MainStore } from '../../../../shared/stores/main.store';
import { CategoriasService } from '../../../../shared/services/categorias.service';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons'
import { addCircle, apps, pricetag, cash, card, documentText, image, cube, bicycle, arrowBack, checkmarkCircle } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.scss'],
  imports: [IonInput, IonButton, IonCheckbox, IonSelect, IonSelectOption, FormsModule, IonIcon, RouterLink],
})
export class ArticuloFormComponent {
  private mainStore = inject(MainStore);

  public categoriasService = inject(CategoriasService);

  public moneda = MonedaEnum;

  public userLogged = this.mainStore.user()?.id_usuario;

  public totalCategorias = resource({
    loader: () => this.categoriasService.getCategorias(),
  });

  public articuloPosteado = input<ArticuloPost>({
    id_vendedor: 1,
    id_categoria: 1,
    usado: false,
    con_envio: false,
    nombre: '',
    precio: 0,
    moneda: MonedaEnum.UYU,
    descripcion: '',
    foto_url: '',
  });

  public saved = output<ArticuloPost>();

  async handleClick(event: any) {
    console.log('Publicaste un articulo!');
    console.log(this.userLogged);
    const articuloExport = {
      id_vendedor: this.userLogged || 1,
      id_categoria: this.articuloPosteado().id_categoria,
      usado: this.articuloPosteado().usado,
      con_envio: this.articuloPosteado().con_envio,
      nombre: this.articuloPosteado().nombre,
      precio: this.articuloPosteado().precio,
      moneda: this.articuloPosteado().moneda,
      descripcion: this.articuloPosteado().descripcion,
      foto_url: this.articuloPosteado().foto_url,
    };

    this.saved.emit(articuloExport);
  }


  constructor(){
    addIcons({     addCircle, apps, pricetag, cash, card,    documentText, image, cube, bicycle,    arrowBack, checkmarkCircle  });
  }
}
