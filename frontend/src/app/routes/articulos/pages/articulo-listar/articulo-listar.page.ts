import { Component, effect, inject, resource } from '@angular/core';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { IonCard, IonCardTitle, IonCardSubtitle, IonSelectOption, IonSelect, IonSearchbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';
import { MainStore } from '../../../../shared/stores/main.store';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { searchOutline, refresh, imageOutline, bicycle, arrowForward } from 'ionicons/icons';

@Component({
  selector: 'app-articulo-listar',
  imports: [IonSelectOption, IonSelect, FormsModule, IonSearchbar, RouterLink, IonIcon, IonButton],
  templateUrl: './articulo-listar.page.html',
  styleUrl: './articulo-listar.page.css',
})
export class ArticuloListarPage {

  private articulosService = inject(ArticulosService)
  private departamentoService = inject(DepartamentosService)
  private mainStore = inject(MainStore)

  user = this.mainStore.user()

  params: Record<string, any> = {
    nombre: null,
    id_vendedor: null,
    id_categoria: null,
    id_departamento: this.user?.id_departamento || null
  }

  public departamentos = resource({
    loader: () => this.departamentoService.getDepartamentos(),
  });

  public categorias = resource({
    loader: () => this.articulosService.getCategorias(),
  });

  articulos = resource({
    loader: () => this.articulosService.getAll(this.params)
  })


  resetFilters() {
    for (const param in this.params) {
      this.params[param] = null
    }
    this.articulos.reload()
  }

  // Funcion aux
  range(n: number) {
    const range = []
    for (let i = 0; i < n; i++) range.push(i);
    return range; 
  }

  constructor(){
    addIcons({searchOutline, refresh, imageOutline, bicycle, arrowForward})
  }
}
