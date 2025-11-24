import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  OnInit,
  output,
  ResourceRef,
  signal,
} from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-grid-nav',
  templateUrl: './grid-nav.component.html',
  styleUrls: ['./grid-nav.component.scss'],
  imports: [IonIcon],
})
export class GridNavComponent {
  resource = input.required<ResourceRef<any>>();

  paginaActual = model.required<number>();
  cantPorPagina = input<number>(12);

  resourceValues = output<any[]>();

  emitter = effect(() => {
    this.resourceValues.emit(this.iterableDivPaginas());
    console.log(this.iterableDivPaginas());
  });

  iterableDivPaginas = computed(() => {
    const res = this.resource().value();
    console.log({ res });
    if (!res) return [];
    const start = (this.paginaActual() - 1) * this.cantPorPagina();
    return res.slice(start, start + this.cantPorPagina());
  });

  totalPages = computed(() => {
    const arts = this.resource().value();
    if (!arts) return 0;
    return Math.ceil(arts.length / this.cantPorPagina());
  });

  changePage(page: number) {
    this.paginaActual.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
