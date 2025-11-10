import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { baseApiURL } from '../../core/configs';
import { Categorias } from '../types/categorias';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private httpClient = inject(HttpClient);
  async getCategorias(): Promise<Categorias[]> {
    return await firstValueFrom(this.httpClient.get<Categorias[]>(baseApiURL + '/categorias'));
  }
}
