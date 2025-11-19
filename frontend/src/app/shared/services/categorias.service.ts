import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment'; 
import { Categoria } from '../types/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private httpClient = inject(HttpClient);
  async getCategorias(): Promise<Categoria[]> {
    return await firstValueFrom(this.httpClient.get<Categoria[]>(environment.apiUrl + '/categorias'));
  }

  async deleteCategoria(id_categoria: number): Promise<void> {
    await firstValueFrom(this.httpClient.delete(environment.apiUrl + '/categorias/'+ id_categoria));
  }
  
  async editCategoria(categoria: Categoria) {
    await firstValueFrom(this.httpClient.put(environment.apiUrl + '/categorias/'+ categoria.id_categoria, categoria));
  }

  async createCategoria(nombre: string) {
    await firstValueFrom(this.httpClient.post(environment.apiUrl + '/categorias', {nombre}));
  }
}
