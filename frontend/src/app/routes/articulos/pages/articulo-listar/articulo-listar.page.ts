import { Component, effect, inject, resource } from '@angular/core';
import { ArticulosService } from '../../../../shared/services/articulos.service';
import { IonCard, IonCardTitle, IonCardSubtitle, IonSelectOption, IonSelect, IonSearchbar, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { DepartamentosService } from '../../../../shared/services/departamentos.service';
import { MainStore } from '../../../../shared/stores/main.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articulo-listar',
  imports: [IonCard, IonCardTitle, IonCardSubtitle, IonSelectOption, IonSelect, FormsModule, IonSearchbar, RouterLink, IonIcon],
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

  artEf = effect(()=> console.log(this.articulos.value()))

  // Funcion aux
  range(n: number) {
    const range = []
    for (let i = 0; i < n; i++) range.push(i);
    return range; 
  }
}
