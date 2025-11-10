import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MainStore } from '../stores/main.store';
import { baseApiURL } from '../../core/configs';
import { Articulo } from '../types/articulos';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  private httpClient = inject(HttpClient)

  private mainStore = inject(MainStore)

  async getAll(queryParams :Record<string, any> = {}) {
  
    let params = new HttpParams();
  
 
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params = params.append(key, String(value));
      }
    });
    
    console.log(params)
    const articulos = await firstValueFrom(
      this.httpClient.get<Articulo[]>(baseApiURL+'/articulos', {params})
    );
    console.log(articulos)
    return articulos;
  }
}
