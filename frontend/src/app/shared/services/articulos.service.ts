import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Articulo } from '../types/articulos';
import { firstValueFrom } from 'rxjs';
import { Categoria } from '../types/categoria';
import { MainStore } from '../stores/main.store';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  private httpClient = inject(HttpClient);

  private mainStore = inject(MainStore);

  public async postArticulo(datos: Partial<Articulo>): Promise<Articulo[]> {
    try {
      return await firstValueFrom(
        this.httpClient.post<Articulo[]>(environment.apiUrl + '/articulos', datos)
      );
    } catch (e: any) {
      throw new Error(e.error.message);
    }
  }

  public async putArticulo(datos: Articulo): Promise<void> {
    try {
      await firstValueFrom(
        this.httpClient.put(`${environment.apiUrl}/articulos/${datos.id_articulo}`, datos)
      );
    } catch (e: any) {
      throw new Error(e.error.message);
    }
  }

  public async getArticuloId(id: string) {
    try {
      return await firstValueFrom(
        this.httpClient.get<Articulo>(`${environment.apiUrl}/articulos/${id}`)
      );
    } catch (e) {
      throw e;
    }
  }

  async getAll(queryParams: Record<string, any> = {}) {
    let params = new HttpParams();

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params = params.append(key, String(value));
      }
    });

    try {
      const articulos = await firstValueFrom(
        this.httpClient.get<Articulo[]>(environment.apiUrl + '/articulos', { params })
      );

      return articulos;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getCategorias() {
    try {
      const categorias = await firstValueFrom(
        this.httpClient.get<Categoria[]>(environment.apiUrl + '/categorias')
      );

      return categorias;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteArticulo(id: number) {
    try {
      await firstValueFrom(
        this.httpClient.delete<Articulo>(environment.apiUrl + `/articulos/${id}`)
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  
}
