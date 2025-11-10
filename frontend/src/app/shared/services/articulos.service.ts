import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MainStore } from '../stores/main.store';
import { baseApiURL } from '../../core/configs';
import { Articulo } from '../types/articulos';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  private httpClient = inject(HttpClient);

  private mainStore = inject(MainStore);

  public async postArticulo(datos: Partial<Articulo>): Promise<Articulo[]> {
    try {
      return await firstValueFrom(
        this.httpClient.post<Articulo[]>(baseApiURL + '/articulos', datos)
      );
    } catch (e: any) {
      throw new Error(e.error.message);
    }
  }
}
