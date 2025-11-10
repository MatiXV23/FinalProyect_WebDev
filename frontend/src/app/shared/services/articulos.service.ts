import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseApiURL } from '../../core/configs';
import { Articulo } from '../types/articulos';
import { firstValueFrom } from 'rxjs';
import { Categoria } from '../types/categoria';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  private httpClient = inject(HttpClient)


  async getAll(queryParams :Record<string, any> = {}) {
    let params = new HttpParams();
 
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params = params.append(key, String(value));
      }
    });
    
    try {
      const articulos = await firstValueFrom(
        this.httpClient.get<Articulo[]>(baseApiURL+'/articulos', {params})
      );

      return articulos;
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async getCategorias(){
    try {
      const categorias = await firstValueFrom(
        this.httpClient.get<Categoria[]>(baseApiURL+'/categorias')
      );

      return categorias;
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
