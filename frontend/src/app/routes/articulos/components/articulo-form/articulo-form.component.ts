import { Component, effect, inject, input, OnInit, output, resource } from '@angular/core';
import {
  IonInput,
  IonButton,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/angular/standalone';
import { ArticuloPost, ArticuloPostFoto, MonedaEnum } from '../../../../shared/types/articulos';
import { MainStore } from '../../../../shared/stores/main.store';
import { CategoriasService } from '../../../../shared/services/categorias.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FotoComponent } from '../../../../shared/components/foto/foto.component';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.scss'],
  imports: [
    IonInput,
    IonButton,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    FotoComponent,
    FormsModule,
    IonIcon,
    RouterLink,
  ],
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

  public saved = output<ArticuloPostFoto>();

  foto?: File;

  async handleClick(event: any) {
    const articulo = {
      id_vendedor: this.userLogged || 1,
      id_categoria: this.articuloPosteado().id_categoria,
      usado: this.articuloPosteado().usado,
      con_envio: this.articuloPosteado().con_envio,
      nombre: this.articuloPosteado().nombre,
      precio: this.articuloPosteado().precio,
      moneda: this.articuloPosteado().moneda,
      descripcion: this.articuloPosteado().descripcion,
    };

    this.saved.emit({ articulo: articulo, foto: this.foto });
  }

  async savePhoto(fotoWebPath: string) {
    this.articuloPosteado().foto_url = fotoWebPath;
    console.log({ fotoWebPath });
    try {
      const response = await fetch(fotoWebPath);
      const blob = await response.blob();

      this.foto = new File([blob], `${this.articuloPosteado().nombre}.jpg`, {
        type: blob.type || 'image/jpeg',
      });
    } catch (e) {
      throw new Error('Error al tomar una foto');
    }
  }
}
